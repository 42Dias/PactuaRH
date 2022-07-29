import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Benefits.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import beneficio from 'service/beneficio/beneficio'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import LoadingLayer from 'ui/components/LoadingLayer'
import DeleteButton from 'ui/components/DeleteButton'
import EditButton from 'ui/components/EditBtn'


export default function Benefits() {

  //===================================== CRUD States
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [benefits, setBenefits] = useState<any[]>([])

  //===================================== Filter States
  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')


  //===================================== Loading States
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

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
    setNomeFilter('')
    setDescricaoFilter('')
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

  // open the edit modal
  function openEditModal(selectedValue: any) {
    setId(selectedValue.id)
    setNome(selectedValue.nome)
    setDescricao(selectedValue.descricao)
    openModal()
  }
  /* 
  ==========================================================================================================
                                          Crud's Functions
  ==========================================================================================================
  */

  async function handleLoadBenefits() {
    const allBenefits = await beneficio.list()

    setBenefits(allBenefits)
    setLoading(false)
  }

  async function handleCreate() {
    setLoadingSubmit(true)
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isCreated = await beneficio.create(data)

    if (isCreated) {
      closeModalNew()
      setLoadingSubmit(false)
    }
    await handleLoadBenefits()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isUpdated = await beneficio.update(id, data)

    if (isUpdated) {
      closeModal()
    }
    await handleLoadBenefits()
  }

  /* 
  ==========================================================================================================
                                          Filters's Functions
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


    let beneficioFilted = await beneficio.listWithManyFilters(filter)

    setBenefits(beneficioFilted)
    console.log(beneficioFilted)

    closeModalFilter()
  }

  /* 
  ==========================================================================================================
                                            UseEffect
  ==========================================================================================================
  */

  useEffect(() => {
    handleLoadBenefits()
  }, [])
  async function handleDelete(id: string) {
    await beneficio.delete(id)

    handleLoadBenefits()
  }


  return (
    <>
      <S.Body>
        <Sidebar />
        <LoadingLayer loading={loading} />
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
              <td>Nome do benefício</td>
              <td>Descrição</td>
            </S.TrTitle>

            {benefits.map((benefit) => (
              <S.TrSecond>
                <td>{benefit.nome}</td>
                <td>{benefit.descricao}</td>
                <td>
                  <EditButton
                    onClick={() => {
                      openEditModal(benefit)
                    }}
                  >
                    <FiEdit size={18} />
                  </EditButton>
                </td>
                <td>
                  <DeleteButton onClick={() => handleDelete(benefit.id)}>
                    <FiTrash size={18} />
                  </DeleteButton>
                </td>
              </S.TrSecond>
            ))}
          </S.Table>


        </S.Container>
      </S.Body>

      {/*
===========================================================================================================
                                      UPDATE MODAL
===========================================================================================================
*/}
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
          <textarea
            placeholder='Descrição'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

      {/*
===========================================================================================================
                                      CREATION MODAL
===========================================================================================================
*/}

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

          <label htmlFor="">Nome do benefício</label>
          <textarea
            
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome do benefício'
            required
          />
          <textarea
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            required
          />

          <button type='submit' disabled={loadingSubmit ?? true}>Enviar</button>
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

          <label htmlFor="">Nome do benefício</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome do benefício'

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