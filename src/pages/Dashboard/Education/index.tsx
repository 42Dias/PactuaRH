import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Education.styled'
import { useEffect, useState } from 'react'
import escolaridade from 'service/escolaridade/escolaridade'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import LoadingLayer from 'ui/components/LoadingLayer'
import DeleteButton from 'ui/components/DeleteButton'
import EditButton from 'ui/components/EditBtn'

export default function Education() {

  //===================================== Modal's States
  const [modalIsOpen   , setIsOpen    ] = useState(false)
  const [modalIsOpenNew, setIsOpenNew ] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)

  //===================================== CRUD's States
  const [nome          , setNome      ] = useState<string>("")
  const [desc          , setDesc      ] = useState<string>("")
  const [id            , setId        ] = useState<string>("")
  const [education     , setEducation ] = useState<any[]>([])


  //===================================== Filter's States
  const [nomeFilter           ,setNomeFilter     ] = useState<string>('')
  const [descricaoFilter      ,setDescricaoFilter] = useState<string>('')


  //===================================== Loading's States
  const [loading, setLoading] = useState(true);


/* 
==========================================================================================================
                                        Modal's Functions
==========================================================================================================
*/ 
  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
    setNomeFilter("")
    setDescricaoFilter("")
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


/* 
==========================================================================================================
                                        Crud's Functions
==========================================================================================================
*/ 

  async function handleLoadEducation() {
    
    
    let allEducation = await escolaridade.list()
    setEducation(allEducation)

    setLoading(false)
  }

  async function handleCreate(){
    let data = {
      nome: nome    ,
      descricao: desc
    }

    let isCreated = await escolaridade.create(data)

    if(isCreated) closeModalNew()
    await handleLoadEducation()
  }

  async function handleUpdate(id: string){
    let data = {
      nome: nome    ,
      descricao: desc
    }

    let isUpdated = await escolaridade.update(id, data)

    if(isUpdated) closeModal()
    await handleLoadEducation()

  }



  async function handleDelete(id: string){
    await escolaridade.delete(id)

    handleLoadEducation()
    
  }

/* 
==========================================================================================================
                                        Filters's Functions
==========================================================================================================
*/ 

  async function handleFilterEducation(){
    let filter = ''

    if (nomeFilter){
      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter){
      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
      
    }

    let areaFilted = await escolaridade.listWithManyFilters(filter)
    

    setEducation(areaFilted)

    closeModalFilter()
  }


/* 
==========================================================================================================
                                          UseEffect
==========================================================================================================
*/ 
  useEffect(
    () => {
      handleLoadEducation() 
    }, []
  )

  return (
    <>
      <S.Body>
        <Sidebar />
        <LoadingLayer loading={loading} />

        <S.Title>
          <S.Container>Bem vindo, {fullName} ????</S.Container>
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
              table="escolaridade"
              filename="Pactua Benef??cios Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          <S.Table id="escolaridade">

            <S.TrTitle>
              <td>Nome da escolaridade</td>
              <td>Descri????o</td>
            </S.TrTitle>

            {
            education.map(
              (education) => (
              <S.TrSecond
                key={education.id}
              >
                <td>{education.nome}</td>
                <td>{education.descricao}</td>
                <td>
                  <EditButton onClick={() => {
                    setId(education.id)
                    setNome(education.nome)
                    setDesc(education.descricao)
                    openModal()
                    }}>
                    <FiEdit size={18} />
                  </EditButton>
                </td>
                <td>
                  <DeleteButton
                  onClick={() => handleDelete(education.id)}
                  >
                    <FiTrash size={18} />
                  </DeleteButton>
                </td>
              </S.TrSecond> )
              )
              }

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

          <h2>Editar escolaridade</h2>
          <input
            type='text'
            placeholder='Nome da escolaridade'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <textarea
            
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
            placeholder='Descri????o da escolaridade'
            required
          />
          
          <button
            type='submit'
          >
            Enviar
          </button>

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
          <h2>Cadastrar escolaridade</h2>

          <label htmlFor="">Nome da escolaridade</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da escolaridade'
            required
          />

          <label htmlFor="">Descri????o da escolaridade</label>
          <textarea
            
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descri????o da escolaridade'
            required
          />

          <button
            type='submit'
          >
            Enviar
          </button>
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
          handleFilterEducation()
        }}
        >
          <h2>Filtros</h2>

          <label htmlFor="">Nome da escolaridade</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome da escolaridade'
          />

          <label htmlFor="">Descri????o da escolaridade</label>
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descri????o da escolaridade'
          />

          <button
            type='submit'
          >
            Enviar
          </button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
