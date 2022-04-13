import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Questionnaires.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { fullName } from 'service/api'
import questionarios from 'service/questionarios/questionarios'

export default function Questionnaires() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenQuestion, setIsOpenQuestion] = useState(false)
  const [questionario, setQuestionario] = useState([])
  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [tipoResposta, setTipoResposta] = useState('')

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setNome('')
    setTipoResposta('')
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
    setNome('')
    setTipoResposta('')
  }

  function openModalQuestion() {
    setIsOpenQuestion(true)
    setIsOpenNew(false)
  }

  function closeModalQuestion() {
    setIsOpenQuestion(false)
  }

  async function handleLoadQuestionario() {
    const allQuestionario = await questionarios.list()

    setQuestionario(allQuestionario)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      tipoResposta: tipoResposta,
    }

    const isCreated = await questionarios.create(data)

    if (isCreated) closeModalNew()
    await handleLoadQuestionario()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      tipoResposta: tipoResposta,
    }

    const isUpdated = await questionarios.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadQuestionario()
  }

  useEffect(() => {
    handleLoadQuestionario()
  }, [])

  async function handleDelete(id: string) {
    await questionarios.delete(id)

    handleLoadQuestionario()
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
          {questionario.length > 0 && (
            <S.Table>
              <S.TrTitle>
                <td>Nome</td>
                <td>Tipo de resposta</td>
              </S.TrTitle>

              {questionario.map((value: any, index) => (
                <S.TrSecond key={index}>
                  <td>{value.nome}</td>
                  <td>{value.tipoResposta}</td>
                  <td>
                    <button
                      onClick={() => {
                        setId(value.id)
                        setNome(value.nome)
                        setTipoResposta(value.tipoResposta)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(value.id)}>
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              ))}
            </S.Table>
          )}

          {questionario.length === 0 && <p>Não há dados!</p>}
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
          <h2>Editar Questionario</h2>

          <input
            type='text'
            placeholder='Nome'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type='text'
            placeholder='Tipo de reposta'
            defaultValue={tipoResposta}
            onChange={(e) => setTipoResposta(e.target.value)}
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
          <h2>Cadastrar questionário</h2>

          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type='text'
            placeholder='Tipo de resposta'
            onChange={(e) => setTipoResposta(e.target.value)}
          />

          <S.ContainerBntFlex>
            <button type='submit'>Enviar</button>
            <button onClick={openModalQuestion}>
              <FiPlus />
              Pergunta
            </button>
          </S.ContainerBntFlex>
        </S.ContainerForm>
      </Modal>

      <Modal
        isOpen={modalIsOpenQuestion}
        onRequestClose={closeModalQuestion}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalQuestion}
        >
          <FiX />
        </button>

        <S.ContainerForm>
          <h2>Pergunta</h2>

          <input type='text' placeholder='Pergunta' />
          <select>
            <option>Tipo de resposta esperada</option>
            <option>Texto</option>
            <option>Sim/Não</option>
          </select>
          <select>
            <option>Tem pergunta adicional para sim?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <select>
            <option>Tem pergunta adicional para não?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>

          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
