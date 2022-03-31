import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Company.styled'
import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function Company() {
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
              <td>CNPJ</td>
              <td>Razão Social</td>
              <td>Nome fantasia</td>
              <td>CNAE</td>
            </S.TrTitle>
            <S.TrSecond>
              <td>00000000</td>
              <td>Teste Inc.</td>
              <td>Teste</td>
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
          <h2>Editar Empresa</h2>

          <input type='number' placeholder='CNPJ' />
          <input type='text' placeholder='Razão Social' />
          <input type='text' placeholder='Nome fantasia' />
          <input type='text' placeholder='Inscrição Estadual' />
          <input type='text' placeholder='Inscrição Municipal' />
          <input type='text' placeholder='CNAE' />
          <input type='text' placeholder='CEP*' />
          <input type='text' placeholder='Logradouro' />
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
          <h2>Cadastrar empresa</h2>

          <input type='number' placeholder='CNPJ' />
          <input type='text' placeholder='Razão Social' />
          <input type='text' placeholder='Nome fantasia' />
          <input type='text' placeholder='Inscrição Estadual' />
          <input type='text' placeholder='Inscrição Municipal' />
          <input type='text' placeholder='CNAE' />
          <input type='text' placeholder='CEP*' />
          <input type='text' placeholder='Logradouro' />

          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
