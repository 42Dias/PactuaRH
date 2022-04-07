import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Positions.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import loadCargos from 'service/cargos/cargos'
import { fullName } from 'service/api'
// All tables used
import cargos from 'service/cargos/cargos'
import funcoes from 'service/funcoes/funcoes'
import escolaridade from 'service/escolaridade/escolaridade'
import areas from 'service/area/area'
import habilidades from 'service/habilidades/habilidades'


export default function Positions() {
  // const { allCargos } = useCargos()
  const [allCargos    , setAllCargos    ] = useState([])
  const [allAreas     , setAllAreas     ] = useState([])
  const [allEducations, setAllEducations] = useState([])
  const [allFunctions , setAllFunctions ] = useState([])
  const [allSkills    , setAllSkills    ] = useState([])

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  // const [cargos, setCargos] = useState()

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

  async function handleLoadArea() {
    const allArea = await areas.list()

    setAllAreas(allArea)
  }
  async function handleLoadEducation() {
    let allEducation = await escolaridade.list()

    setAllEducations(allEducation)
  }

  async function handleLoadFunctions() {
    const funcao = await funcoes.list()

    setAllFunctions(funcao)
  }

  async function handleLoadSkills() {
    const allSkills = await habilidades.list()

    setAllSkills(allSkills)
  }

  // Loads all tables associated
  async function handleLoadAssociations() {
    handleLoadArea()
    handleLoadEducation()
    handleLoadFunctions()
    handleLoadSkills()
  }

  async function handleLoadPosition() {
    const cargo = await cargos.list()

    console.log('cargos')
    console.log(cargo)

    setAllCargos(cargo)
  }


  async function handleCreatePosition(){
    console.log("test")
  }

  async function handleUpdatePosition(id: string){
    console.log("test")
  }

  async function handleDeletePosition(id: string){
    console.log("test")
  }


  useEffect(() => {
    handleLoadPosition()
    handleLoadAssociations()
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

          <input type='text' placeholder='Descrição' />
          <input type='text' placeholder='Descrição oficial' />

          <select>
            <option>Código Brasileiro de Ocupações</option>
          </select>
          <select>
            <option>Código de Ocupação conforme IR</option>
          </select>
          <select>
            <option hidden >Área</option>
            {
            allAreas.map(
              (area) => (
                <option>Área</option>
              )
            )}
            
          </select>
          <select>
            <option hidden>Cargos Liderados</option>
            {
            allCargos.map(
              (area) => (
                <option>Área</option>
              )
            )
            }
          </select>
          <select>
            <option hidden >Habilidades</option>
            {
              allSkills.map(
                (skill) => (
                  <option>Habilidade</option>
                )
              )
            }
          </select>
          <select>
            {/* Habilidade */}
            <option hidden >Desejaveis</option>
          </select>
          <select>
            <option>Funções</option>
            {allFunctions.map(
              (area)=> (
                <option>Área</option>
              )
            )}
          </select>
          <select>
            <option hidden >Escolaridade</option>
            {allEducations.map(
              (education) => (
                <option>Escolaridade</option>
              )
            )}
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
        <S.ContainerForm
          onSubmit={e => {
            e.preventDefault()
            handleCreatePosition()
          }}
        >
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
