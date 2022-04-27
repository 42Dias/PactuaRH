import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Education.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import escolaridade from 'service/escolaridade/escolaridade'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default function Education() {
  const [modalIsOpen   , setIsOpen    ] = useState(false)
  const [modalIsOpenNew, setIsOpenNew ] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  const [nome          , setNome      ] = useState<string>("")
  const [desc          , setDesc      ] = useState<string>("")
  const [id            , setId        ] = useState<string>("")
  const [education     , setEducation ] = useState<any[]>([])
    
  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
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

  async function handleLoadEducation() {
    let allEducation = await escolaridade.list()

    setEducation(allEducation)
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

  useEffect(
    () => {
      handleLoadEducation() 
    }, []
  )

  async function handleDelete(id: string){
    await escolaridade.delete(id)

    handleLoadEducation()
    
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

          <S.Table id="escolaridade">

            <S.TrTitle>
              <td>Nome da escolaridade</td>
              <td>Descrição</td>
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
                  <button onClick={() => {
                    setId(education.id)
                    setNome(education.nome)
                    setDesc(education.descricao)
                    openModal()
                    }}>
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button
                  onClick={() => handleDelete(education.id)}
                  >
                    <FiTrash size={18} />
                  </button>
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
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
            placeholder='Descrição da escolaridade'
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

          <label htmlFor="">Descrição da escolaridade</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descrição da escolaridade'
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
          handleCreate()
        }}
        >
          <h2>Filtros</h2>

          <label htmlFor="">Nome da escolaridade</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da escolaridade'
            required
          />

          <label htmlFor="">Descrição da escolaridade</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descrição da escolaridade'
            required
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
