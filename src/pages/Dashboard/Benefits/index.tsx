import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Benefits.styled'
import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function Benefits() {
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
              <td>Nome do benefício</td>
              <td>Razão Social</td>
              <td>Data admissão</td>
              <td>Data demissão</td>
            </S.TrTitle>
            <S.TrSecond>
              <td>Auxilio infraestrutura</td>
              <td>front end</td>
              <td>25/09/2022</td>
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
          <h2>Editar benefício</h2>

          <input type='text' placeholder='Nome do benefício' />
          <input type='text' placeholder='Descrição' />
          <input type='text' placeholder='Operadora da assistência médica' />
          <input type='text' placeholder='Razão Social' />
          <input type='number' placeholder='CNPJ' />
          <input type='text' placeholder='Registro da ASN' />
          <input type='number' placeholder='Data admissão ' />
          <input type='number' placeholder='Data demissão' />
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
          <h2>Cadastrar benefício</h2>

          <input type='text' placeholder='Nome do benefício' />
          <input type='text' placeholder='Descrição' />
          <input type='text' placeholder='Operadora da assistência médica' />
          <input type='text' placeholder='Razão Social' />
          <input type='number' placeholder='CNPJ' />
          <input type='text' placeholder='Registro da ASN' />
          <input type='number' placeholder='Data admissão ' />
          <input type='number' placeholder='Data demissão' />

          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
