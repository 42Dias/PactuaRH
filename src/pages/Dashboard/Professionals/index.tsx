import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Professionals.styled'
import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function Professionals() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)

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
              <td>CPF</td>
              <td>RG</td>
              <td>Cargo</td>
            </S.TrTitle>
            <S.TrSecond>
              <td>Ryan</td>
              <td>049.253.142-45</td>
              <td>55.432.123-9</td>
              <td>Full Stack</td>
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
          <h2>Editar profissional</h2>

          <input type='text' placeholder='Nome' />
          <input type='number' placeholder='CPF' />
          <input type='number' placeholder='RG' />
          <input type='number' placeholder='Data de nascimento' />
          <input type='text' placeholder='Nome da mãe' />
          <input type='text' placeholder='Cargo' />
          <input type='text' placeholder='Benefícios' />
          <input type='text' placeholder='CEP*' />
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
          <h2>Cadastrar profissional</h2>

          <input type='text' placeholder='Nome' />
          <input type='number' placeholder='CPF' />
          <input type='number' placeholder='RG' />
          <input type='number' placeholder='Data de nascimento' />
          <input type='text' placeholder='Nome da mãe' />
          <input type='text' placeholder='Cargo' />
          <input type='text' placeholder='Benefícios' />
          <input type='text' placeholder='CEP*' />
          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
