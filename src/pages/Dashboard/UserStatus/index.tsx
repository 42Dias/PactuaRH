import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './UserStatus.styled'
import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function UserStatus() {
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
              <td>Data de demissão</td>
              <td>Situação</td>
              <td>Salário</td>
            </S.TrTitle>
            <S.TrSecond>
              <td>00/00/0000</td>
              <td>Afastado(a)</td>
              <td>0.000,00</td>
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
          <h2>Editar status</h2>

          <InputMask mask='99/99/9999' placeholder='Data da damissão' />

          <select name='' id=''>
            <option hidden>Situação</option>
            <option value=''>Ativo</option>
            <option value=''>Demitido</option>
            <option value=''>Afastado</option>
          </select>

          <select name='' id=''>
            <option hidden>Motivo da demissão</option>
            <option value=''>Justa causa</option>
            <option value=''>Sem justa causa</option>
            <option value=''>Pediu demissão</option>
          </select>

          <select name='' id=''>
            <option hidden>Tipo de remuneração</option>
            <option value=''>Mensalista</option>
            <option value=''>Horista</option>
            <option value=''>PJ</option>
          </select>

          <InputMask type='number' mask='R$' placeholder='Sálario' />

          <select name='' id=''>
            <option hidden>Reajuste salario</option>
            <option value=''>Promoção</option>
            <option value=''>Mérito</option>
            <option value=''>CCT</option>
          </select>

          <InputMask mask='99/99/9999' placeholder='Data CCT' />

          <input type='text' placeholder='Sindicato' />

          <select name='' id=''>
            <option hidden>Vale transporte</option>
            <option value=''>Sim</option>
            <option value=''>Não</option>
          </select>

          <input type='number' placeholder='Valor' />

          <input type='number' placeholder='Valor do VR' />

          <select name='' id=''>
            <option hidden>Assistência médica</option>
            <option value=''>Sim</option>
            <option value=''>Não</option>
          </select>

          <input type='number' placeholder='Valor da AM' />

          <input type='text' placeholder='Banco' />

          <input type='number' placeholder='Agência' />

          <input type='number' placeholder='Conta' />
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
          <h2>Cadastrar status do usuário</h2>

          <InputMask mask='99/99/9999' placeholder='Data da damissão' />

          <select name='' id=''>
            <option hidden>Situação</option>
            <option value=''>Ativo</option>
            <option value=''>Demitido</option>
            <option value=''>Afastado</option>
          </select>

          <select name='' id=''>
            <option hidden>Motivo da demissão</option>
            <option value=''>Justa causa</option>
            <option value=''>Sem justa causa</option>
            <option value=''>Pediu demissão</option>
          </select>

          <select name='' id=''>
            <option hidden>Tipo de remuneração</option>
            <option value=''>Mensalista</option>
            <option value=''>Horista</option>
            <option value=''>PJ</option>
          </select>

          <InputMask type='number' mask='R$' placeholder='Sálario' />

          <select name='' id=''>
            <option hidden>Reajuste salario</option>
            <option value=''>Promoção</option>
            <option value=''>Mérito</option>
            <option value=''>CCT</option>
          </select>

          <InputMask mask='99/99/9999' placeholder='Data CCT' />

          <input type='text' placeholder='Sindicato' />

          <select name='' id=''>
            <option hidden>Vale transporte</option>
            <option value=''>Sim</option>
            <option value=''>Não</option>
          </select>

          <input type='number' placeholder='Valor' />

          <input type='number' placeholder='Valor do VR' />

          <select name='' id=''>
            <option hidden>Assistência médica</option>
            <option value=''>Sim</option>
            <option value=''>Não</option>
          </select>

          <input type='number' placeholder='Valor da AM' />

          <input type='text' placeholder='Banco' />

          <input type='number' placeholder='Agência' />

          <input type='number' placeholder='Conta' />

          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
