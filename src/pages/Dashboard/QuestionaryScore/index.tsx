import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './QuestionaryScore.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import questionariosScores from 'service/questionariosScore/questionariosScore'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { useParams } from 'react-router-dom'
import handleSetNumber from 'utils/handleSetNumber'
import stateHandler from 'utils/changeStatesHandlers'


export default function QuestionaryScore() {
  const { id } = useParams()

  /*
==========================================================================================================
                                        States
==========================================================================================================
*/

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)

  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [de, setDe] = useState<string>('')
  const [ate, setAte] = useState<string>('')

  const [selectedId, setId] = useState<string>('')
  const [benefits, setBenefits] = useState<any>({})

  const [benefitsSelected, setBenefitsSelected] = useState<any>({})
  const [subItens        , setSubItens        ] = useState<any>([{}])
  const [subItensNew     , setSubItensNew     ] = useState<any>([])

  const [formato, setFormato] = useState('')
  const [pontuacaoExcelente, setPontuacaoExcelente] = useState('')
  const [pontuacaoBom, setPontuacaoBom] = useState('')
  const [pontuacaoRegular, setPontuacaoRegular] = useState('')
  const [pontuacaoRuim, setPontuacaoRuim] = useState('')

  const [area, setArea] = useState([])
  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')
  const [subAreaFilter, setSubAreaFilter] = useState<boolean>(false)
  const [areaPaiFilter, setAreaPaiFilter] = useState<string>('')
  /*
  ==========================================================================================================
                                        Modals Functions
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
    clearValues()
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
    clearValues()
  }

  function closeModalNew() {
    setIsOpenNew(false)
    clearValues()
  }
  /*
  ==========================================================================================================
                                      CRUD Functions
  ==========================================================================================================
  */

  async function handleLoadBenefits() {
    const newId = window.location.pathname.replace('/questionario-score/', '')
    const allBenefits = await questionariosScores.listWithFilter('questionarioId', newId)

    setBenefits(allBenefits[0] || {})
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      formato: formato,
      items: subItens,
      questionarioId: id,
    }

    const isCreated = await questionariosScores.create(data)

    if (isCreated) closeModalNew()
    await handleLoadBenefits()
  }

  async function handleUpdate(selectedId: string) {
    const data = {
      nome: nome,
      formato: formato,
      items: subItens,
      itemsNew: subItensNew,
      questionarioId: id,
    }

    const isUpdated = await questionariosScores.update(selectedId, data)

    if (isUpdated) closeModal()
    await handleLoadBenefits()
  }

  async function handleDelete(id: string) {
    await questionariosScores.delete(id)

    handleLoadBenefits()
  }

  useEffect(() => {
    handleLoadBenefits()
  }, [])

  /*
==========================================================================================================
                                    Filter Function
==========================================================================================================
*/
  async function handleFilterArea() {

    let filter = ''

    if (nomeFilter) {
      
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter) {
      

      if (filter.length != 0) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`

    }


    let questionariosScoresFilted = await questionariosScores.listWithManyFilters(filter)

    setBenefits(questionariosScoresFilted)
    console.log(questionariosScoresFilted)

    closeModalFilter()
  }

  /*
  ==========================================================================================================
                                      Set Values
  ==========================================================================================================
  */

  function handleSetValues(benefits: any) {
    setBenefitsSelected(benefits)
    setFormato(benefits?.formato)
    setDe(benefits?.de)
    setAte(benefits?.ate)
    setPontuacaoExcelente(benefits?.pontuacaoExcelente)
    setPontuacaoBom(benefits?.pontuacaoBom)
    setPontuacaoRegular(benefits?.pontuacaoRegular)
    setPontuacaoRuim(benefits?.pontuacaoRuim)
  }

  function clearValues(){
    setNome("")
    setFormato("")
    setSubItens([{}])
    setSubItensNew([])
    setId("")
    
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

              {
                !benefits.id && (
                  <button onClick={openModalNew}>
                    Novo <FiPlus size={18} color='#fff' />
                  </button>
                )
              }


              {/*
                {
                  benefits.id && (
                    <button
                      onClick={openModalFilter}>
                      Filtros
                      <FiFilter size={18} />
                    </button>
                  )
                }
              */}


            </div>


            {
              benefits.id && (
                <ReactHTMLTableToExcel
                  table="benefits"
                  filename="Pactua Benefícios Excel"
                  sheet="Sheet"
                  buttonText="Exportar para excel"
                />
              )
            }
          </S.FlexButtons>

          <S.Table id="benefits">
            <S.TrTitle>
              <td>Nome</td>
              <td>Quantidade de Níveis</td>
            </S.TrTitle>
            {
              benefits.id && (
                <S.TrSecond>
                  <td>{benefits?.nome || "Não cadastrado"}</td>
                  <td>{benefits?.item?.length || "Não cadastrado"}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleSetValues(benefits)
                        setId(benefits?.id)
                        setNome(benefits?.nome)
                        setFormato(benefits?.formato)
                        setSubItens(benefits?.item)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(benefits?.id)}>
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              )
            }
          </S.Table>


        </S.Container>
      </S.Body>

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
          <h2>Criar score</h2>

          <label htmlFor="">Nome</label>
          <input
            type="text"
            onChange={e => setNome(e.target.value)}
            value={nome}
          />

          <label htmlFor="">Forma de Pontos</label>
          <select
            name=""
            id=""
            onChange={e => setFormato(e.target.value)}
            value={formato}
          >
            <option hidden> Selecione </option>
            <option value="porcentagem"> Porcentagem </option>
            <option value="quantidade"> Quantidade  </option>
          </select>
          <h2>Items </h2>
          {
            subItens.map(
              (e: any, i: number) => (
                <div className="border">

                  <label htmlFor="">pontuacao</label>
                  <input
                    type="text"
                    name='pontuacao'
                    defaultValue={e.pontuacao}
                    required
                    //@ts-ignore
                    onKeyUp={(e) => e.target.value = e.target.value.replace(/[^\d]/, '')}
                    onChange={e => stateHandler.handleChangeStateOfObject(i, e, subItens, setSubItens)}
                  />


                  <label htmlFor="">nome</label>
                  <input
                    required
                    defaultValue={e.nome}
                    name='nome'
                    onChange={e => stateHandler.handleChangeStateOfObject(i, e, subItens, setSubItens)}
                    type="text"
                  />

                  <div className="return">
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, subItens, setSubItens)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }
          <button className='btn-plus' type='button' onClick={() => stateHandler.addFormFields(subItens, setSubItens)}>
            <FiPlus />
          </button>


          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

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
            handleUpdate(selectedId)
          }}
        >

          <label htmlFor="">Nome</label>
          <input
            type="text"
            onChange={e => setNome(e.target.value)}
            value={nome}
          />

          <label htmlFor="">Forma de Pontos</label>
          <select
            name=""
            id=""
            onChange={e => setFormato(e.target.value)}
            value={formato}
          >
            <option value="porcentagem"> Porcentagem </option>
            <option value="quantidade"> Quantidade  </option>
          </select>


          <h2>Items </h2>
          {
            subItens.map(
              (e: any, i: number) => (
                <div className="border">
                  <label htmlFor="">pontuacao</label>
                  <input
                    type="text"
                    defaultValue={ parseInt(e.pontuacao)}
                    name='pontuacao'
                    //@ts-ignore
                    onKeyUp={(e) => e.target.value = e.target.value.replace(/[^\d]/, '')}
                    onChange={e => stateHandler.handleChangeStateOfObject(i, e, subItens, setSubItens)}
                  />

                  <label htmlFor="">nome</label>
                  <input
                    name='nome'
                    defaultValue={e.nome}

                    onChange={e => stateHandler.handleChangeStateOfObject(i, e, subItens, setSubItens)}
                    type="text"
                  />

                  <div className="return">
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, subItens, setSubItens)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

        {
            subItensNew.map(
              (e: any, i: number) => (
                <div className="border">

                  <label htmlFor="">pontuacao</label>
                  <input
                    type="text"
                    name='pontuacao'
                    //@ts-ignore
                    onKeyUp={(e) => e.target.value = e.target.value.replace(/[^\d]/, '')}
                    onChange={e => stateHandler.handleChangeStateOfObject(i, e, subItensNew, setSubItensNew)}
                  />

                  <label htmlFor="">nome</label>
                  <input
                    name='nome'
                    onChange={e => stateHandler.handleChangeStateOfObject(i, e, subItensNew, setSubItensNew)}
                    type="text"
                  />

                  <div className="return">
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, subItensNew, setSubItensNew)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }


          <button className='btn-plus' type='button' onClick={() => stateHandler.addFormFields(subItensNew, setSubItensNew)}>
            <FiPlus />
          </button>

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}