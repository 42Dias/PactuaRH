import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Positions.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import loadCargos from 'service/cargos/cargos'
import cargos from 'service/cargos/cargos'
import { fullName } from 'service/api'

export default function Positions() {
  // const { allCargos } = useCargos()
  const [allCargos, setAllCargos] = useState([])

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  // const [cargos, setCargos] = useState()

  async function getAllCargos() {
    const cargo = await cargos.list()

    console.log('cargos')
    console.log(cargo)

    setAllCargos(cargo)
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
    getAllCargos()
  }, [])

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
          {/* TABELA */}
          {allCargos.length > 0 && (
            <S.Table>
              <S.TrTitle>
                <td>Descrição</td>
                <td>CBO</td>
                <td>Nível Hierarquico</td>
              </S.TrTitle>
              <S.TrSecond>
                <td>Ryan</td>
                <td>123</td>
                <td>Gerente</td>
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
          )}
          {allCargos.length == 0 && <p>Nenhum cargo cadastrado!</p>}
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

        {/* EDITAR CARGO */}
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

        {/* CADASTRO DO CARGO */}
        <S.ContainerForm>
          <h2>Cadastrar profissional</h2>

          <input type='text' placeholder='Descrição' />
          <input type='text' placeholder='Descrição oficial' />
          <select>
            <option>Código Brasileiro de Ocupações</option>
          </select>
          <select>
            <option>Código de Ocupação conforme IR</option>
          </select>
          <select>
            <option>Área</option>
          </select>
          <select>
            <option>Cargos Liderados</option>
          </select>
          <select>
            <option>Habilidades</option>
          </select>
          <select>
            <option>Desejaveis</option>
          </select>
          <select>
            <option>Funções</option>
          </select>
          <select>
            <option>Escolaridade</option>
          </select>
          <select>
            <option>Questionario</option>
          </select>
          <input type='text' placeholder='Plano ADM' />
          <input type='text' placeholder='Classe/Faixa sugerida' />
          <input type='text' placeholder='Nível Hierárquico na empresa' />
          <input
            type='text'
            placeholder='Grau de instrução mínimo para o cargo'
          />
          <button>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
