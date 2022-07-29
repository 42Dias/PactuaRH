import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter, FiArrowRight } from 'react-icons/fi'
import * as S from './Pdi.styled'
import { useEffect, useState } from 'react'
import pdiService from 'service/pdi/pdi'
import { fullName } from 'service/api'
import Link from "react-router-dom";
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import profissional from 'service/profissional/profissional'
import LoadingLayer from 'ui/components/LoadingLayer'
import DeleteButton from 'ui/components/DeleteButton'
import EditButton from 'ui/components/EditBtn'

export default function Pdi() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [pdi, setPdi] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([])

  const [pdiItems, setPdiItems] = useState<any[]>([])
  const [pdiItemsNew, setPdiItemsNew] = useState<any[]>([])

  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')


  const [allUsers, setAllUsers] = useState<any[]>([])
  const [profissionalSelected, setProfissionalSelected] = useState<any>()

  const [loading, setLoading] = useState(true);

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

  async function handleLoadPdi() {
    
    
    const allPdi = await pdiService.list()
    setPdi(allPdi)

    setLoading(false)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: desc,
      pdiItems: pdiItems,
      profissionaisId: profissionalSelected,
    }

    const isCreated = await pdiService.create(data)

    if (isCreated) closeModalNew()
    await handleLoadPdi()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: desc,
      pdiItems: pdiItems,
      pdiItemsNew: pdiItemsNew,
      profissionaisId: profissionalSelected,
    }

    const isUpdated = await pdiService.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadPdi()
  }
  
  async function handleDelete(id: string) {
    await pdiService.delete(id)

    handleLoadPdi()
  }

  useEffect(() => {
    handleLoadPdi()
    handleLoadProfessionals() 
  }, [])


  /*
  ==========================================================================================================
                                            Sub Crud Item
  ==========================================================================================================
  */
  async function handleLoadProfessionals() {
    const allProfessionals = await profissional.list()

    setAllUsers(allProfessionals)
  }


  /*
   =====================================================================================================
                                   Handle Change Screen elements 
   =====================================================================================================
   */
  const addFormFields = (state: any[], setState: (value: any) => void) => {
    // @ts-ignore
    setState([...state, {}])
  }

  const handleChangeState = (i: number, e: any, state: any[], setState: (value: any) => void) => {

    const newFormValues = [...state]
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value

    setState(newFormValues)
  }

  const removeFormFields = (i: number, state: any[], setState: (value: any) => void) => {

    const newFormValues = [...state]
    newFormValues.splice(i, 1)
    setState(newFormValues)
  }


  /*
  ==========================================================================================================
                                              Filters
  ==========================================================================================================
  */

  async function handleFilterPdi() {
    let filter = ''

    if (nomeFilter) {
      
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter) {
      

      if (filter.length != 0) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
    }

    const areaFilted = await pdiService.listWithManyFilters(filter)

    setPdi(areaFilted)

    closeModalFilter()
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
              <button onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table='pdi'
              filename='Pactua PDI Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>

          <S.Table id='pdi'>
            <S.TrTitle>
              <td>Nome da pdi</td>
              <td>Descrição</td>
            </S.TrTitle>

            {pdi.map((pdi) => (
              <S.TrSecond key={pdi.id}>

                <td>{pdi.nome}</td>
                <td>{pdi.descricao}</td>
                <td>
                  <a href={`/pdi-item/${pdi.id}`}
                  className="black-color"
                  >
                    <FiArrowRight size={18} />
                  </a>
                </td>
                <td>
                  <EditButton
                    onClick={() => {
                      setId(pdi.id)
                      setNome(pdi.nome)
                      setDesc(pdi.descricao)
                      setPdiItems(pdi.pdiItems)
                      setProfissionalSelected(pdi.profissionaisId)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </EditButton>
                </td>
                <td>
                  <DeleteButton onClick={() => handleDelete(pdi.id)}>
                    <FiTrash size={18} />
                  </DeleteButton>
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
          <h2>Editar pdi</h2>
          <label htmlFor="">Nome</label>
          <input
            type='text'
            placeholder='Nome da pdi'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label htmlFor="">Nome</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
            placeholder='Descrição da pdi'
            required
          />

          <label htmlFor="">Colaborador</label>
          <select
            value={profissionalSelected}
            onChange={(e) => {
              const newUserSelected: string = e.target.value
              setProfissionalSelected(newUserSelected)
            }}

            placeholder='PRI Cadastrado'
          >
            <option hidden>Selecione</option>

            {allUsers.map((user, i) => (
              <option value={user.id}>
                {user.nome}
              </option>
            ))}
          </select>
          {
            pdiItems.length > 0 && <label>Pdi Itens</label>
          }
          {
            pdiItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    defaultValue={e.nome}
                    onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                  />

                  <label htmlFor="">Descrição</label>
                  <div className="return">
                    <input
                      type="text"
                      name="descricao"
                      defaultValue={e.descricao}
                      onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                    />
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => removeFormFields(i, pdiItems, setPdiItems)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>


              )
            )
          }

          {
            pdiItemsNew.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    onChange={(e) => handleChangeState(i, e, pdiItemsNew, setPdiItemsNew)}
                  />

                  <label htmlFor="">Descrição</label>
                  <div className="return">
                    <input
                      type="text"
                      name="descricao"
                      onChange={(e) => handleChangeState(i, e, pdiItemsNew, setPdiItemsNew)}
                    />
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => removeFormFields(i, pdiItemsNew, setPdiItemsNew)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>


              )
            )
          }

          <button type='button' onClick={() => addFormFields(pdiItemsNew, setPdiItemsNew)}>
            <FiPlus />
          </button>

          <S.ContainerBntFlex>
            <button type='submit'>Enviar</button>
          </S.ContainerBntFlex>

          {/* <button type='submit'>Enviar</button> */}
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
          <h2>Cadastrar pdi</h2>

          <label htmlFor=''>Nome da pdi</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da pdi'
            required
          />

          <label htmlFor=''>Descrição da pdi</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descrição da pdi'
            required
          />

          <label htmlFor=''>Colaborador</label>
          <select
            value={profissionalSelected}
            onChange={(e) => {
              const newUserSelected: string = e.target.value
              setProfissionalSelected(newUserSelected)
            }}

            placeholder='Profissional Cadastrado'
          >
            <option hidden>Selecione</option>

            {allUsers.map((user, i) => (
              <option value={user.id}>
                {user.nome}
              </option>
            ))}
          </select>

          {
            pdiItems.length > 0 && <label>Pdi Itens</label>
          }
          {
            pdiItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    defaultValue={e.nome}
                    onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                  />

                  <label htmlFor="">Descrição</label>
                  <div className="return">
                    <input
                      type="text"
                      name="descricao"
                      defaultValue={e.descricao}
                      onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                    />
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => removeFormFields(i, pdiItems, setPdiItems)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }
          <button type='button' onClick={() => addFormFields(pdiItems, setPdiItems)}>
            <FiPlus />
          </button>


          <S.ContainerBntFlex>
            <button type='submit'>Enviar</button>
          </S.ContainerBntFlex>

          {/* <button type='submit'>Enviar</button> */}
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
            handleFilterPdi()
          }}
        >
          <h2>Filtros</h2>

          <label htmlFor=''>Nome da pdi</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome da pdi'
          />

          <label htmlFor=''>Descrição da pdi</label>
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descrição da pdi'
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
