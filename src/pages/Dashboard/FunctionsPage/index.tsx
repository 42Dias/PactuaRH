import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './FunctionsPage.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import funcoes from 'service/funcoes/funcoes'
import { fullName } from 'service/api'

export default function FunctionsPage() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [allFuncoes, setAllFuncoes] = useState([])
  const [nome, setNome] = useState<string>('')
  const [funcaoEdit, setFuncaoEdit] = useState<any>({})

  async function getAllFuncoes() {
    const funcao = await funcoes.list()
    setAllFuncoes(funcao)
  }

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

  useEffect(() => {
    getAllFuncoes()
  }, [])

  async function createFuncao() {
    const data = {
      nome: nome,
    }
    console.log(data)
    console.log(data.nome)

    const isCreated = await funcoes.cadastro(data)
    console.log(isCreated)

    if (isCreated) closeModalNew()
    getAllFuncoes()
  }

  async function updateFuncao(id: string) {
    const data = {
      nome: nome,
    }
    console.log(data)
    console.log(data.nome)

    const isUpdated = await funcoes.update(id, data)
    console.log(isUpdated)

    if (isUpdated) closeModal()
    getAllFuncoes()
  }

  async function deleteFuncao(id: string) {
    const isDelete = await funcoes.delete(id)
    getAllFuncoes()
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
          {allFuncoes.length > 0 && (
            // eslint-disable-next-line react/jsx-key
            <S.Table>
              <S.TrTitle>
                <td>Função</td>
              </S.TrTitle>

<<<<<<< HEAD
          <S.Table>
            <S.TrTitle>
              <td>Função</td>
              <td>Mão de obra</td>
              <td>Grau de instrução</td>
              <td>Requisito da função</td>
            </S.TrTitle>
            
            <S.TrSecond>
              <td>Dev</td>
              <td>front end</td>
              <td>Ensino medio</td>
              <td>Desenvolvimento</td>
              <td>
                <button onClick={openModal}>
                  <FiEdit size={18} />
                </button>
              </td>
              <td>
                <button>
                  <FiTrash size={18} />
                </button>
              </td>
            </S.TrSecond>
          </S.Table>
=======
              {allFuncoes.map((funcao: any, index) => (
                <S.TrSecond key={index}>
                  <td>{funcao.nome}</td>
                  <td>
                    <button
                      onClick={() => {
                        setFuncaoEdit(funcao)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteFuncao(funcao.id)
                      }}
                    >
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              ))}
            </S.Table>
          )}
          {allFuncoes.length === 0 && <p>Não há funções cadastradas!</p>}
>>>>>>> 691e6bfa4edab91f66ad8ceabd973724a8b53b27
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
          onSubmit={(e: any) => {
            e.preventDefault()
            // e.target.reset()
            updateFuncao(funcaoEdit.id)
          }}
        >
          <h2>Editar Função</h2>

          <input
            type='text'
            placeholder='Função'
            defaultValue={funcaoEdit?.nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {/* <input type='text' placeholder='Mão de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <input type='text' placeholder='Grau de instrução' />
          <input type='text' placeholder='Requisito da função' /> */}
          <button type='submit'>Salvar</button>
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
          onSubmit={(e: any) => {
            e.preventDefault()
            // e.target.reset()
            createFuncao()
          }}
        >
          <h2>Cadastrar função</h2>

          <input
            type='text'
            placeholder='Função'
            onChange={(e) => setNome(e.target.value)}
          />
          {/* <input type='text' placeholder='Mão de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <input type='text' placeholder='Grau de instrução' />
          <input type='text' placeholder='Requisito da função' /> */}

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
