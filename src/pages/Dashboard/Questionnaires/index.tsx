import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Questionnaires.styled'
import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function Questionnaires() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenQuestion, setIsOpenQuestion] = useState(false)

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

  function openModalQuestion() {
    setIsOpenQuestion(true)
    setIsOpenNew(false)
  }

  function closeModalQuestion() {
    setIsOpenQuestion(false)
  }
  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, Luciano 😁</S.Container>
        </S.Title>
        <S.Container>
          <S.FlexButtons>
            <button onClick={openModalNew}>
              Novo <FiPlus size={18} color='#fff' />
            </button>
          </S.FlexButtons>

          <S.Table>
            <S.TrTitle>
              <td>Nome</td>
              <td>Tipo de resposta</td>
            </S.TrTitle>
            <S.TrSecond>
              <td>Desempenho</td>
              <td>Sim/Não</td>
              <td></td>
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
            <S.TrSecond>
              <td>Geral</td>
              <td>Texto</td>
              <td></td>
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

        <S.ContainerForm>
          <h2>Editar Questionario</h2>

          <input type='text' placeholder='Nome' />
          <input type='text' placeholder='Descrição' />

          <button>Enviar</button>
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

        <S.ContainerForm>
          <h2>Cadastrar questionário</h2>

          <input type='text' placeholder='Nome' />
          <input type='text' placeholder='Descrição' />

          <S.ContainerBntFlex>
            <button>Enviar</button>
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
