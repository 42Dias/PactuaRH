import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Education.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import escolaridade from 'service/escolaridade/escolaridade'
import { fullName } from 'service/api'

export default function Education() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [education, setEducation] = useState<any[]>([])

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

  async function handleLoadEducation() {
    const allEducation = await escolaridade.list()

    setEducation(allEducation)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: desc,
    }

    const isCreated = await escolaridade.create(data)

    if (isCreated) closeModalNew()
    await handleLoadEducation()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: desc,
    }

    const isUpdated = await escolaridade.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadEducation()
  }

  useEffect(() => {
    handleLoadEducation()
  }, [])

  async function handleDelete(id: string) {
    await escolaridade.delete(id)

    handleLoadEducation()
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
          </S.FlexButtons>

          <S.Table>
            <S.TrTitle>
              <td>Nome da escolaridade</td>
              <td></td>
            </S.TrTitle>

            {education.map((education) => (
              <S.TrSecond key={education.id}>
                <td>{education.nome}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(education.id)
                      setNome(education.nome)
                      setDesc(education.descricao)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(education.id)}>
                    <FiTrash size={18} />
                  </button>
                </td>
              </S.TrSecond>
            ))}
          </S.Table>
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
          <h2>Editar escolaridade</h2>
          <input
            type='text'
            placeholder='Nome da escolaridade'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
            placeholder='Descrição da escolaridade'
            required
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
          <h2>Cadastrar escolaridade</h2>

          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da escolaridade'
            required
          />

          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descrição da escolaridade'
            required
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
