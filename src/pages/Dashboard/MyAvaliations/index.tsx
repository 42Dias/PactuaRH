import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus,  FiEye, FiCheck, FiX, FiFilter } from 'react-icons/fi'
import * as S from './MyAvaliations.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import beneficio from 'service/beneficio/beneficio'
import { fullName, getId } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import profissional from 'service/profissional/profissional'
import { Link } from 'react-router-dom'


export default function MyAvaliations() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [benefits, setBenefits] = useState<any[]>([])
  const [subArea        ,setSubArea  ] = useState<boolean>(false)
  const [areaPai        ,setAreaPai  ] = useState<string>('')
  const [allData        ,setAllData  ] = useState<any>({})
  // setAllData

  const [area           , setArea    ] = useState([])
  const [nomeFilter           ,setNomeFilter     ] = useState<string>('')
  const [descricaoFilter      ,setDescricaoFilter] = useState<string>('')
  const [subAreaFilter        ,setSubAreaFilter  ] = useState<boolean>(false)
  const [areaPaiFilter        ,setAreaPaiFilter  ] = useState<string>('')

  
  
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
    const allBenefits = await beneficio.list()

    // setBenefits(allBenefits)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isCreated = await beneficio.create(data)

    if (isCreated) closeModalNew()
    await handleLoadBenefits()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isUpdated = await beneficio.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadBenefits()
  }

  useEffect(() => {
    handleLoadBenefits()
    handleLoadAvaliations()
  }, [])
  async function handleDelete(id: string) {
    // await beneficio.delete(id)

    // handleLoadBenefits()
  }

  async function handleLoadAvaliations(){
    let professionalData = await profissional.listWithFilter("userId", getId())
    
    professionalData = professionalData[0] || {}
    
    console.log(professionalData)



    setBenefits(professionalData?.cargo?.questionarios)
    setAllData(professionalData)

  }

  
  
  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          {/* <S.FlexButtons>
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
          */}

          <h3>Minhas Avaliações</h3>

          <S.Table id="benefits">
            <S.TrTitle>
              <td>Nome da Avaliação</td>
            </S.TrTitle>

            {benefits.map((benefit) => (
              <S.TrSecond>
                <td>{benefit.nome}</td>
                <td>
                  <Link
                  to={`/responder-questionario/${benefit.id}`}
                  className='black-color'
                    onClick={() => {
                      setId(benefit.id)
                      setNome(benefit.nome)
                      openModal()
                    }}
                  >
                    <FiEye size={18} />
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(benefit.id)}>
                    <FiCheck size={18} />
                  </button>
                </td>
              </S.TrSecond>
            ))}
          </S.Table>

          <h3>Avaliações do meu subordinado </h3>
          <S.Table id="benefits">
            <S.TrTitle>
              <td>Nome da Avaliação</td>
            </S.TrTitle>

            {
              allData?.cargo?.cargosLiderados?.map(
                (cargos: any) => (
                  cargos.questionarios?.map(
                    (e: any) => (
                      <S.TrSecond>
                      <td>{e.nome}</td>
                      <td>
                        <Link
                          to={`/responder-questionario/${e.id}`}
                          className='black-color'
                          onClick={() => {
                            setId(e.id)
                            setNome(e.nome)
                            openModal()
                          }}  
                        >
                          <FiEye size={18} />
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(e.id)}>
                          <FiCheck size={18} />
                        </button>
                      </td>
                    </S.TrSecond>
                    )
                  ))
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
          <h2>Editar Avaliação</h2>
          <input
            type='text'
            placeholder='Nome da Avaliação'
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
          <h2>Cadastrar Avaliação</h2>

          <label htmlFor="">Nome da Avaliação</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da Avaliação'
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

      
    </>
  )
}