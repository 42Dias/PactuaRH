import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './QuestionaryQuestions.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import questionarioItem from 'service/questionarioItem/questionarioItem'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { useParams } from 'react-router-dom'

import { FaLightbulb } from 'react-icons/fa'



export default function QuestionaryQuestions() {
  const { id } = useParams()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [selectedId, setSelectedId] = useState<string>('')
  const [benefits, setBenefits] = useState<any[]>([])
  const [subArea        ,setSubArea  ] = useState<boolean>(false)
  const [areaPai        ,setAreaPai  ] = useState<string>('')
  

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
    setSubArea(false)
    setAreaPai('')
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setSubArea(false)
    setAreaPai('')
    setIsOpenNew(false)
  }

  async function handleLoadBenefits() {
    let url = window.location.pathname
    let id = url.replace('/questionario-perguntas/', '')
    const allBenefits = await questionarioItem.listWithFilter("questionarioId", id)

    setBenefits(allBenefits)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
      questionarioId: id,
    }
    
    const isCreated = await questionarioItem.create(data)

    if (isCreated) closeModalNew()
    await handleLoadBenefits()
  }

  async function handleUpdate(selectedId: string) {
    let url = window.location.pathname
    let id = url.replace('/questionario-perguntas/', '')


    const data = {
      nome: nome,
      descricao: descricao,
      questionarioId: id,
    }

    const isUpdated = await questionarioItem.update(selectedId, data)

    if (isUpdated) closeModal()
    await handleLoadBenefits()
  }

  useEffect(() => {
    handleLoadBenefits()
  }, [])
  async function handleDelete(selectedId: string) {
    await questionarioItem.delete(selectedId)

    handleLoadBenefits()
  }

  async function handleFilterArea(){

    let filter = ''

    if (nomeFilter){
      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter){

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
      
    }
  

    let questionarioItemFilted = await questionarioItem.listWithManyFilters(filter)

    setBenefits(questionarioItemFilted)

    closeModalFilter()
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
              table="benefits"
              filename="Pactua Benefícios Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          <S.Table id="benefits">
            <S.TrTitle>
              <td>Nome</td>
              <td> Respostas </td>
              <td></td>
              <td></td>
            </S.TrTitle>

            {benefits.map((benefit) => (
              <S.TrSecond>
                <td>{benefit.nome}</td>
                <td>
                  <a href={`/respostas/${benefit.id}`}
                  className='anchor-icon'
                  >
                    <FaLightbulb size={20} />
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedId(benefit.id)
                      setNome(benefit.nome)
                      setDescricao(benefit.descricao)
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
            handleUpdate(selectedId)
          }}
        >
          <h2>Editar pergunta do questionario</h2>
          <input
            type='text'
            placeholder='Nome do pergunta do questionario'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
           <input
            type='text'
            placeholder='Descrição'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

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
          <h2>Cadastrar pergunta do questionario</h2>

          <label htmlFor="">Nome do pergunta do questionario</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome do pergunta do questionario'
            required
          />
          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            required
          />

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

          <label htmlFor="">Nome do pergunta do questionario</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome do pergunta do questionario'
      
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