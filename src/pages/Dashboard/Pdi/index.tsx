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

export default function Pdi() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [pdi, setPdi] = useState<any[]>([])

  const [pdiItems, setPdiItems] = useState<any[]>([])
  const [pdiItemsNew, setPdiItemsNew] = useState<any[]>([])

  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')

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
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: desc,
      pdiItems: pdiItems,
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
    }

    const isUpdated = await pdiService.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadPdi()
  }

  useEffect(() => {
    handleLoadPdi()
  }, [])

  async function handleDelete(id: string) {
    await pdiService.delete(id)

    handleLoadPdi()
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
    console.log("e.target.value")
    console.log(e.target.value)

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
      console.log('tem nome')
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter) {
      console.log('tem desc')

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
                  <button>
                    <FiArrowRight size={18} />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setId(pdi.id)
                      setNome(pdi.nome)
                      setDesc(pdi.descricao)
                      // setPdiItems(pdi.items)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(pdi.id)}>
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
          {
            pdiItems.length > 0 && <h3>Pdi Itens</h3>
          }
          {
            pdiItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                  />

                  <label htmlFor="">Descrição</label>
                  <input
                    type="text"
                    name="descricao"
                    onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                  />
                  <button
                    className='btn-actions'
                    type='button'
                    onClick={() => removeFormFields(i, pdiItems, setPdiItems)}
                  >
                    <FiTrash />
                  </button>
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
                  <input
                    type="text"
                    name="descricao"
                    onChange={(e) => handleChangeState(i, e, pdiItemsNew, setPdiItemsNew)}
                  />
                  <button
                    className='btn-actions'
                    type='button'
                    onClick={() => removeFormFields(i, pdiItemsNew, setPdiItemsNew)}
                  >
                    <FiTrash />
                  </button>
                </div>


              )
            )
          }


          <S.ContainerBntFlex>
            <button type='button' onClick={() => addFormFields(pdiItemsNew, setPdiItemsNew)}>
              <FiPlus />
            </button>
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

          {
            pdiItems.length > 0 && <h3>Pdi Itens</h3>
          }
          {
            pdiItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                  />

                  <label htmlFor="">Descrição</label>
                  <input
                    type="text"
                    name="descricao"
                    onChange={(e) => handleChangeState(i, e, pdiItems, setPdiItems)}
                  />
                  <button
                    className='btn-actions'
                    type='button'
                    onClick={() => removeFormFields(i, pdiItems, setPdiItems)}
                  >
                    <FiTrash />
                  </button>
                </div>


              )
            )
          }
          <S.ContainerBntFlex>
            <button type='button' onClick={() => addFormFields(pdiItems, setPdiItems)}>
              <FiPlus />
            </button>
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
