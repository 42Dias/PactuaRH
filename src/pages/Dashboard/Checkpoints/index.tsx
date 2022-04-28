import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Checkpoints.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import checkpoint from '../../../service/checkpoint/checkpoint'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'


export default function Checkpoints() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)

  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [checkpoints, setCheckpoints] = useState<any[]>([])

  const [subArea        ,setSubArea  ] = useState<boolean>(false)
  const [areaPai        ,setAreaPai  ] = useState<string>('')
  

  const [area           , setArea    ] = useState([])
  const [nomeFilter     ,setNomeFilter     ] = useState<string>('')
  const [descricaoFilter,setDescricaoFilter] = useState<string>('')
  const [subAreaFilter  ,setSubAreaFilter  ] = useState<boolean>(false)
  const [areaPaiFilter  ,setAreaPaiFilter  ] = useState<string>('')

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

  async function handleLoadCheckpoints() {
    const allCheckpoints = await checkpoint.list()

    setCheckpoints(allCheckpoints)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
      data: date,
    }

    const isCreated = await checkpoint.create(data)

    if (isCreated) closeModalNew()
    await handleLoadCheckpoints()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
      data: date,
    }

    const isUpdated = await checkpoint.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadCheckpoints()
  }

  useEffect(() => {
    handleLoadCheckpoints()
  }, [])
  async function handleDelete(id: string) {
    await checkpoint.delete(id)

    handleLoadCheckpoints()
  }

  async function handleFilterArea(){

    console.log("oujbnbojfdnbfnjbnfkdjnbkjdfnbndfbndfbkjfgjk")
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
  

    let checkpointFilted = await checkpoint.listWithManyFilters(filter)

    setCheckpoints(checkpointFilted)
    console.log(checkpointFilted)

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
              table="checkpoints"
              filename="Pactua Checkpoints Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          <S.Table id="checkpoints">
            <S.TrTitle>
              <td>Nome do Checkpoint</td>
              <td>Descrição</td>
            </S.TrTitle>

            {checkpoints.map((benefit) => (
              <S.TrSecond>
                <td>{benefit.nome}</td>
                <td>{benefit.descricao}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(benefit.id)
                      setNome(benefit.nome)
                      setDate(benefit.data)
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
          <h2>Editar Checkpoint</h2>
          <input
            type='text'
            placeholder='Nome do Checkpoint'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
           <input
            type='text'
            placeholder='Descrição'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

        <input
            type='date'
            placeholder='Data'
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          <h2>Cadastrar Checkpoint</h2>

          <label htmlFor="">Nome do Checkpoint</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome do Checkpoint'
            required
          />
          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            required
          />

          <input
            type='date'
            placeholder='Data'
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

          <label htmlFor="">Nome do Checkpoint</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome do Checkpoint'
      
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