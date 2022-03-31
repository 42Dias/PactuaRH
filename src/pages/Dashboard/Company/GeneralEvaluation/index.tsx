import * as S from './GeneralEvaluation.styled'
import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { useState } from 'react'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'


export default function GeneralEvaluation() {

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
    return(
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
                    </S.TrTitle>
                    <S.TrSecond>
                      <td>Giovanna</td>
                      <td>
                      <button>
                         <Link to='/'><FiEye size={18}/>
                    </Link>
                    </button>
                      </td>
                      <td>
                        <button onClick={openModal}>
                          <FiEdit size={18}/>
                        </button>
                      </td>
                      <td>
                        <button>
                          <FiTrash size={18} />
                        </button>
                      </td>

                   
                    </S.TrSecond>

                    <S.TrSecond>
                      <td> Teste</td>
                      <td>
                      <button>
                         <Link to='/'><FiEye size={18}/>
                    </Link>
                    </button>
                      </td>
                      <td>
                        <button onClick={openModal}>
                          <FiEdit size={18}/>
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
                  <h2>Editar Avaliação Geral</h2>
        
                  <input type='text' placeholder='Nome' />
                  <select name='' id=''>
                        <option hidden> O colaborador costuma apresentar iniciativa?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>

                    <select name='' id=''>
                        <option hidden>Ele é engajado e procura atingir as metas?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>
                    <select name='' id=''>
                        <option hidden> Ele é organizado em suas atividades diárias?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>

                    <select name='' id=''>
                        <option hidden> Ele se adapta aos novos clientes e desafios?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>
                    <select name='' id=''>
                        <option hidden> Ele interage bem com seus colegas de equipe? </option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>

                    <select name='' id=''>
                        <option hidden>Ele demonstra aptidões para liderar?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>
                    <select name='' id=''>
                        <option hidden> Tem a competência necessária para o que faz?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>
                  
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
                  <h2>Cadastrar Avaliação Geral</h2>
        
                  <input type='text' placeholder='Nome do colaborador' />
                  <select name='' id=''>
                        <option hidden> O colaborador costuma apresentar iniciativa?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>

                    <select name='' id=''>
                        <option hidden>Ele é engajado e procura atingir as metas?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>
                    <select name='' id=''>
                        <option hidden> Ele é organizado em suas atividades diárias?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>

                    <select name='' id=''>
                        <option hidden> Ele se adapta aos novos clientes e desafios?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>
                    <select name='' id=''>
                        <option hidden> Ele interage bem com seus colegas de equipe? </option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>

                    <select name='' id=''>
                        <option hidden>Ele demonstra aptidões para liderar?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>
                    <select name='' id=''>
                        <option hidden> Tem a competência necessária para o que faz?</option>
                        <option value=''>Nunca</option>
                        <option value=''>Raramente</option>
                        <option value=''>Frequentemente</option>
                        <option value=''>Sempre</option>
                    </select>

                  
                  <button>Enviar</button>
                </S.ContainerForm>
              </Modal>
            </>
    )
}