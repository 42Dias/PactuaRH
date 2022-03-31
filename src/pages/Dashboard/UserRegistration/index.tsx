import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './UserRegistration.styled'
import { useState } from 'react'
import InputMask from 'react-input-mask'
import { Link } from 'react-router-dom'

export default function UserRegistration() {
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
            <Link to='/status-de-usuario'>
              Status <FiEye size={18} color='#fff' />
            </Link>
          </S.FlexButtons>

          <S.Table>
            <S.TrTitle>
              <td>Nome</td>
              <td>Gênero</td>
              <td>CPF</td>
              <td>RG</td>
            </S.TrTitle>
            <S.TrSecond>
              <td>Giovanna</td>
              <td>Mulher</td>
              <td>000.000.000-00</td>
              <td>000.000.000</td>
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
          <h2>Editar usuário</h2>

          <input type='text' value='Ryan Costa' />

          <select name='' id=''>
            <option value=''>Homem</option>
            <option value=''>Mulher</option>
            <option value=''>Prefiro não responder</option>
          </select>
          <InputMask mask='999.999.999-99' placeholder='Seu CPF' />
          <InputMask mask='99.999.999-9' placeholder='Seu RG' />
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
          <h2>Novo usuário</h2>

          <input type='text' placeholder='Seu nome completo' />
          <InputMask mask='99/99/9999' placeholder='Data de nascimento' />

          <select name='' id=''>
            <option hidden>Gênero</option>
            <option value=''>Mulher</option>
            <option value=''>Homem</option>
            <option value=''>Prefiro não responder</option>R
          </select>

          <select name='' id=''>
            <option hidden>Estado civil</option>
            <option value=''>Solteiro(a)</option>
            <option value=''>Casado(a)</option>
            <option value=''>Viúvo(a)</option>
          </select>

          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
