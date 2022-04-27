import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Skills.styled'
import { useEffect, useState } from 'react'
import habilidades from 'service/habilidades/habilidades'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function Skills() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [skills, setSkills] = useState<any[]>([])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
  }

  async function handleLoadSkills() {
    const allSkills = await habilidades.list()

    setSkills(allSkills)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isCreated = await habilidades.create(data)

    if (isCreated) closeModalNew()
    await handleLoadSkills()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isUpdated = await habilidades.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadSkills()
  }
  useEffect(() => {
    handleLoadSkills()
  }, [])

  async function handleDelete(id: string) {
    await habilidades.delete(id)

    handleLoadSkills()
  }
  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          <S.FlexButtons>
            <button onClick={openModalNew}>
              Novo <FiPlus size={18} color='#fff' />
            </button>
            <ReactHTMLTableToExcel
              table="habilidades"
              filename="Pactua Habilidades Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
           />
          </S.FlexButtons>

          {skills.length > 0 && (
            <S.Table id="habilidades">
              <S.TrTitle>
                <td>Nome do habilidades</td>
                <td>Descrição</td>
              </S.TrTitle>

              {skills.map((skills) => (
                <S.TrSecond>
                  <td>{skills.nome}</td>
                  <td>{skills.descricao}</td>
                  <td>
                    <button
                      onClick={() => {
                        setId(skills.id)
                        setNome(skills.nome)
                        setDescricao(skills.descricao)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(skills.id)}>
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              ))}
            </S.Table>
          )}

          {skills.length === 0 && <p>Não há dados</p>}
        </S.Container>
      </S.Body>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModal}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate(id)
          }}
        >
          <h2>Editar habilidades</h2>
          <input
            type='text'
            placeholder='Nome do habilidades'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type='text'
            placeholder='Descrição'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

      <Modal
        isOpen={modalIsOpenNew}
        onRequestClose={closeModalNew}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalNew}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleCreate()
          }}
        >
          <h2>Cadastrar habilidades</h2>

          <label htmlFor="">Nome da habilidade</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da habilidade'
            required
          />
          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            required
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
