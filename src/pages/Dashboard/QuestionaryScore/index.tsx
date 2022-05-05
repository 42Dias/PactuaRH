import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './QuestionaryScore.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import questionario from 'service/questionarios/questionarios'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { useParams } from 'react-router-dom'
import handleSetNumber from 'utils/handleSetNumber'


export default function QuestionaryScore() {
  const { id } = useParams()

  const [modalIsOpen       , setIsOpen     ] = useState(false)
  const [modalIsOpenNew    , setIsOpenNew  ] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  
  const [nome      , setNome     ] = useState<string>('')
  const [descricao , setDescricao] = useState<string>('')
  const [de        , setDe       ] = useState<string>('')
  const [ate       , setAte      ] = useState<string>('')
  
  const [selectedId, setId      ] = useState<string>('')
  const [benefits  , setBenefits] = useState<any>({})
  
  const [benefitsSelected  , setBenefitsSelected  ] = useState<any>({})
  const [formato           , setFormato           ] = useState('')
  const [pontuacaoExcelente, setPontuacaoExcelente] = useState('')
  const [pontuacaoBom      , setPontuacaoBom      ] = useState('')
  const [pontuacaoRegular  , setPontuacaoRegular  ] = useState('')
  const [pontuacaoRuim     , setPontuacaoRuim     ] = useState('')

  const [area           , setArea    ] = useState([])
  const [nomeFilter           ,setNomeFilter     ] = useState<string>('')
  const [descricaoFilter      ,setDescricaoFilter] = useState<string>('')
  const [subAreaFilter        ,setSubAreaFilter  ] = useState<boolean>(false)
  const [areaPaiFilter        ,setAreaPaiFilter  ] = useState<string>('')

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
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
  }

  async function handleLoadBenefits() {
    const newId  = window.location.pathname.replace('/questionario-score/', '')
    const allBenefits = await questionario.find(newId)

    console.log(allBenefits)

    setBenefits(allBenefits)
  }

  async function handleUpdate(selectedId: string) {
    const data = {
      de:        de,
      ate:       ate,
      formato:   formato,
      pontuacaoExcelente: pontuacaoExcelente,
      pontuacaoBom:       pontuacaoBom,
      pontuacaoRegular:   pontuacaoRegular,
      pontuacaoRuim:      pontuacaoRuim,
    }

    const isUpdated = await questionario.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadBenefits()
  }

  useEffect(() => {
    handleLoadBenefits()
  }, [])

  async function handleFilterArea(){

    let filter = ''

    if (nomeFilter){
      console.log("tem nome")
      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter){
      console.log("tem desc")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
      
    }
  

    let questionarioFilted = await questionario.listWithManyFilters(filter)

    setBenefits(questionarioFilted)
    console.log(questionarioFilted)

    closeModalFilter()
  }

  function handleSetValues(benefits: any){
    setBenefitsSelected(benefits)
    setFormato(benefits?.formato)
    setDe(benefits?.de)
    setAte(benefits?.ate)
    setPontuacaoExcelente(benefits?.pontuacaoExcelente)
    setPontuacaoBom(benefits?.pontuacaoBom)
    setPontuacaoRegular(benefits?.pontuacaoRegular)
    setPontuacaoRuim(benefits?.pontuacaoRuim)
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
              {/*
              <button onClick={openModalNew}>
                Novo <FiPlus size={18} color='#fff' />
              </button>
              */}

              {/*
              <button 
             
              onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
              */}

            </div>

            <ReactHTMLTableToExcel
              table="benefits"
              filename="Pactua Benefícios Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          <S.Table id="benefits">
            <S.TrTitle>
              <td>pontuacao Excelente</td>
              <td>pontuacao Bom</td>
              <td>pontuacao Regular</td>
              <td>pontuacao Ruim</td>
            </S.TrTitle>

              <S.TrSecond>
                <td>{benefits?.pontuacaoExcelente || "Não cadastrado"}</td>
                <td>{benefits?.pontuacaoBom || "Não cadastrado"      }</td>
                <td>{benefits?.pontuacaoRegular || "Não cadastrado"  }</td>
                <td>{benefits?.pontuacaoRuim || "Não cadastrado"     }</td>
                <td>
                  <button
                    onClick={() => {
                      handleSetValues(benefits)
                      setId(benefits?.id)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  {/* <button onClick={() => handleDelete(benefit.id)}>
                    <FiTrash size={18} />
                  </button> */}
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

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate(selectedId)
          }}
        >
          <h2>Editar score</h2>

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

          <label htmlFor="">De</label>
          <input
            type="text"
            onChange={e => handleSetNumber(e.target.value, setDe)}
            value={de}
          />

          <label htmlFor="">Até</label>
          <input
            type="text"
            onChange={e => setAte(e.target.value)}
            value={ate}
          />

          <label htmlFor=""> Pontuação Excelente</label>
          <input
            type="text"
            onChange={e => setPontuacaoExcelente(e.target.value)}
            value={pontuacaoExcelente}

          />


          <label htmlFor=""> Pontuação Boa</label>
          <input
            type="text"
            onChange={e => setPontuacaoBom(e.target.value)}
            value={pontuacaoBom}
          />

          <label htmlFor=""> Pontuação Regular</label>
          <input
            type="text"
            onChange={e => setPontuacaoRegular(e.target.value)}
            value={pontuacaoRegular}

          />


          <label htmlFor=""> Pontuação Ruim</label>
          <input
            type="text"
            onChange={e => setPontuacaoRuim(e.target.value)}
            value={pontuacaoRuim}

          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}