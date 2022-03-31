import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './FunctionsPage.styled'
import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function FunctionsPage() {
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
          <h2>Editar Função</h2>

          <input type='text' placeholder='Função' />
          <input type='text' placeholder='Mão de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <input type='text' placeholder='Grau de instrução' />
          <input type='text' placeholder='Requisito da função' />
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
          <h2>Cadastrar função</h2>

          <input type='text' placeholder='Função' />
          <input type='text' placeholder='Mão de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <input type='text' placeholder='Grau de instrução' />
          <input type='text' placeholder='Requisito da função' />

          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
