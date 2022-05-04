import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Avaliations.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import avaliacao from 'service/avaliacoes/avaliacoes'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import stateHandler from 'utils/changeStatesHandlers'
import cargos from 'service/cargos/cargos'
import questionarios from 'service/questionarios/questionarios'

export default function Avaliations() {
  /*
==========================================================================================================
                                            STATES
==========================================================================================================
*/
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [avaliations, setAvaliations] = useState<any[]>([])

  const [subArea, setSubArea] = useState<boolean>(false)

  const [selectedCargo,        setSelectedCargo       ] = useState<any[]>([])
  const [selectedQuestionario, setSelectedQuestionario] = useState<any[]>([])

  const [allCargo, setAllCargo] = useState<any[]>([])
  const [allQuestionario, setAllQuestionario] = useState<any[]>([])


  const [area, setArea] = useState([])
  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')
  const [subAreaFilter, setSubAreaFilter] = useState<boolean>(false)
  const [areaPaiFilter, setAreaPaiFilter] = useState<string>('')


  /*
  ==========================================================================================================
                                            Modal Functions
  ==========================================================================================================
  */
  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
    setNomeFilter('')
    setDescricaoFilter('')
    setAreaPaiFilter('')
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setSubArea(false)
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setSubArea(false)
    setIsOpenNew(false)
  }

  /*
  ==========================================================================================================
                                        Main Crud Functions
  ==========================================================================================================
  */
  async function handleLoadAvaliations() {
    const allAvaliations = await avaliacao.list()

    setAvaliations(allAvaliations)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
      cargos: selectedCargo,
      questionarios: selectedQuestionario,
    }

    console.log("data")
    console.log(data)

    const isCreated = await avaliacao.create(data)

    if (isCreated) closeModalNew()
    await handleLoadAvaliations()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
      cargos: selectedCargo,
      questionarios: selectedQuestionario,  
    }

    const isUpdated = await avaliacao.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadAvaliations()
  }

  async function handleDelete(id: string) {
    await avaliacao.delete(id)

    handleLoadAvaliations()
  }

  /*
  ==========================================================================================================
                                      Associated Tables Functions
  ==========================================================================================================
  */

  async function handleLoadCargos() {
    const allCargos = await cargos.list()

    setAllCargo(allCargos)

  }

  async function handleLoadQuestionarios() {
    const allQuestionarios = await questionarios.list()

    setAllQuestionario(allQuestionarios)
  }



  /*
  ==========================================================================================================
                                              useEffects
  ==========================================================================================================
  */

  useEffect(() => {
    handleLoadAvaliations()
    handleLoadCargos()
    handleLoadQuestionarios()
  }, [])
  /*
  ==========================================================================================================
                                              Filters
  ==========================================================================================================
  */

  async function handleFilterArea() {


    let filter = ''

    if (nomeFilter) {
      console.log("tem nome")
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter) {
      console.log("tem desc")

      if (filter.length != 0) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`

    }


    let avaliacaoFilted = await avaliacao.listWithManyFilters(filter)

    setAvaliations(avaliacaoFilted)
    console.log(avaliacaoFilted)

    closeModalFilter()
  }
  /*
  ==========================================================================================================
                                            Set just the id in a state
  ==========================================================================================================
  */
  function setJustIdsOfArrayObject(arrayOfObjects: any[], setState: any){
    if(!arrayOfObjects) return;
    
    setState([])

    arrayOfObjects.map(
      object => setState((prevData: any) => {
        //@ts-ignore
        return [...new Set( [ ...prevData, object.id  ] )]	
       } )
    )
  }

  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          <S.FlexButtons>
            <div>
              <button onClick={openModalNew}>
                Novo <FiPlus size={18} color='#fff' />
              </button>
              <button

                onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table="avaliations"
              filename="Pactua Avaliações Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          <S.Table id="avaliations">
            <S.TrTitle>
              <td>Nome do Avaliação</td>
              <td>Descrição</td>
            </S.TrTitle>

            {avaliations.map((benefit) => (
              <S.TrSecond>
                <td>{benefit.nome}</td>
                <td>{benefit.descricao}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(benefit.id)
                      setNome(benefit.nome)
                      setDescricao(benefit.descricao)
                      console.log(benefit?.cargo)
                      console.log(benefit?.questionario)
                      setJustIdsOfArrayObject(benefit?.cargo, setSelectedCargo)
                      setJustIdsOfArrayObject(benefit?.questionario, setSelectedQuestionario)

                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(benefit.id)}>
                    <FiTrash size={18} />
                  </button>
                </td>
              </S.TrSecond>
            ))}
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

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate(id)
          }}
        >
          <h2>Editar Avaliação</h2>
          <input
            type='text'
            placeholder='Nome do Avaliação'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type='text'
            placeholder='Descrição'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <h3>Cargos</h3>
          {
            selectedCargo.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <select
                    name=""
                    defaultValue={e}
                    onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, selectedCargo, setSelectedCargo)}
                  >
                    <option hidden> Selecione </option>
                    {allCargo.map(
                      e => (
                        <option value={e.id}> {e.nome} </option>
                      )
                    )}
                  </select>

                  <button
                    className='btn-actions'
                    type='button'
                    onClick={() => stateHandler.removeFormFields(i, selectedCargo, setSelectedCargo)}
                  >
                    <FiTrash />
                  </button>
                </div>
              )
            )
          }
          <button type='button' onClick={() => stateHandler.addFormFields(selectedCargo, setSelectedCargo)}>
            <FiPlus />
          </button>


          <h3>Questionarios</h3>
          {
            selectedQuestionario.map(
              (e, i) => (
                <div className="border">
                  {/* {e} */}
                  <label htmlFor="">Nome</label>
                  <select
                    name=""
                    defaultValue={e}
                    onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, selectedQuestionario, setSelectedQuestionario)}
                  >
                    <option hidden> Selecione </option>
                    {allQuestionario.map(
                      e => (
                        <option value={e.id}> {e.nome} </option>
                      )
                    )}
                  </select>

                  <button
                    className='btn-actions'
                    type='button'
                    onClick={() => stateHandler.removeFormFields(i, selectedQuestionario, setSelectedQuestionario)}
                  >
                    <FiTrash />
                  </button>
                </div>
              )
            )
          }
          <button type='button' onClick={() => stateHandler.addFormFields(selectedQuestionario, setSelectedQuestionario)}>
            <FiPlus />
          </button>



          <button type='submit'>Enviar</button>
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

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleCreate()
          }}
        >
          <h2>Cadastrar Avaliação</h2>

          <label htmlFor="">Nome do Avaliação</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome do Avaliação'
            required
          />
          <textarea
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            required
          />

          <div className="action-box">
            <h3>Cargos</h3>
            <button className='btn-plus' type='button' onClick={() => stateHandler.addFormFields(selectedCargo, setSelectedCargo)}>
              <FiPlus />
            </button>
          </div>
          {
            selectedCargo.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <div className="return">
                    <select
                      name=""
                      defaultValue={e.nome}
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, selectedCargo, setSelectedCargo)}
                    >
                      <option hidden> Selecione </option>
                      { allCargo.map(
                        e => (
                          <option value={e.id}> { e.nome } </option>
                        )
                      ) }
                    </select>
                    <button
                      className='btn-actions btn-trash' 
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, selectedCargo, setSelectedCargo)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

          <div className="action-box">
            <h3>Questionarios</h3>
            <button className='btn-plus' type='button' onClick={() => stateHandler.addFormFields(selectedQuestionario, setSelectedQuestionario)}>
              <FiPlus />
            </button>
          </div>
          {
            selectedQuestionario.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <div className="return">
                    <select
                      name=""
                      defaultValue={e.nome}
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, selectedQuestionario, setSelectedQuestionario)}
                    >
                      <option hidden> Selecione </option>
                      { allQuestionario.map(
                        e => (
                          <option value={e.id}> { e.nome } </option>
                        )
                      ) }
                    </select>
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, selectedQuestionario, setSelectedQuestionario)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }


          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

      <Modal
        isOpen={modalIsOpenFilter}
        onRequestClose={closeModalFilter}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalFilter}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleFilterArea()
          }}
        >
          <h2>Filtros</h2>

          <label htmlFor="">Nome do Avaliação</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome do Avaliação'

          />
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descrição'

          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}