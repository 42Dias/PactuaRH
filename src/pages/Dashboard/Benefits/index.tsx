import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Benefits.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import beneficio from 'service/beneficio/beneficio'

export default function Benefits() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [nome      , setNome      ] = useState<string>("")
  const [id        , setId        ] = useState<string>("")
  const [benefits      , setBenefits      ] = useState<any[]>([])


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
    let allBenefits = await beneficio.list()

    setBenefits(allBenefits)
  }

  async function handleCreate(){
    let data = {
      nome: nome
    }

    let isCreated = await beneficio.create(data)

    if(isCreated) closeModalNew()
    await handleLoadBenefits()

  }

  async function handleUpdate(id: string){
    let data = {
      nome: nome
    }

    let isUpdated = await beneficio.update(id, data)

    if(isUpdated) closeModal()
    await handleLoadBenefits()

  }


  useEffect(
    () => {
      handleLoadBenefits() 
    }, []
  )


  async function handleDelete(id: string){
    await beneficio.delete(id)

    handleLoadBenefits()
    
  }
  return (
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
              <td>Nome do benefício</td>
              <td></td>
            </S.TrTitle>

            {
            benefits.map(
              (benefit) => (
              <S.TrSecond>
                <td>{benefit.nome}</td>
                <td>
                  <button onClick={() => {
                    setId(benefit.id)
                    setNome(benefit.nome)
                    openModal()
                    }}>
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button
                  onClick={() => handleDelete(benefit.id)}
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

          <h2>Editar benefício</h2>
          <input
            type='text'
            placeholder='Nome do benefício'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
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
          <h2>Cadastrar benefício</h2>

          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome do benefício'
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
