import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter, FiArrowRight } from 'react-icons/fi'
import * as S from './Pri.styled'
import { useEffect, useState } from 'react'
import priIService from 'service/pri/pri'
import { fullName } from 'service/api'
import profissional from 'service/profissional/profissional'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import LoadingLayer from 'ui/components/LoadingLayer'
import EditButton from 'ui/components/EditBtn'
import DeleteButton from 'ui/components/DeleteButton'

export default function Pri() {

  //===================================== Modal's States
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)

  //===================================== Crud's States
  const [idSelected, setId] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [profissionalSelected, setProfissionalSelected] = useState<any>()
  const [pri, setPri] = useState<any[]>([])
  const [priItems, setPriItems] = useState<any[]>([])
  const [priItemsNew, setPriItemsNew] = useState<any[]>([])
  const [allUsers, setAllUsers] = useState<any[]>([])


  //===================================== Filter's States
  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')


  //===================================== Loading's States
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

  async function handleLoadPri() {
    const allPri = await priIService.list()    
    setPri(allPri)

    setLoading(false)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: desc,
      priItems: priItems,
      profissionaisId: profissionalSelected,
    }

    const isCreated = await priIService.create(data)

    if (isCreated) closeModalNew()
    await handleLoadPri()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: desc,
      priItems: priItems,
      priItemsNew: priItemsNew,
      profissionaisId: profissionalSelected,
    }
    
    const isUpdated = await priIService.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadPri()
  }

  useEffect(() => {
    handleLoadPri()
  }, [])

  async function handleDelete(id: string) {
    await priIService.delete(id)

    handleLoadPri()
  }

  async function handleLoadUsers() {
    const allProfissionals = await profissional.list()

    setAllUsers(allProfissionals)
  }

  useEffect(() => {
    handleLoadUsers()
  }, [])
 

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

  async function handleFilterPri() {
    let filter = ''

    if (nomeFilter) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
    }

    const areaFilted = await priIService.listWithManyFilters(filter)

    setPri(areaFilted)

    closeModalFilter()
  }

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
              <button onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table='pri'
              filename='Pactua PDI Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>

          <S.Table id='pri'>
            <S.TrTitle>
              <td>Nome da pri</td>
              <td>Descri????o</td>
            </S.TrTitle>

            {pri.map((pri) => (
              <S.TrSecond key={pri.id}>
                <td>{pri.nome}</td>
                <td>{pri.descricao}</td>
                <td>
                  <a href={`/pri-item/${pri.id}`}
                  className="black-color" 
                  >  
                    <FiArrowRight size={18} />
                  </a>
                </td>
                <td>
                  <EditButton
                    onClick={() => {
                      setId(pri.id)
                      setNome(pri.nome)
                      setDesc(pri.descricao)
                      setPriItems(pri.priItems)
                      setProfissionalSelected(pri.profissionaisId)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </EditButton>
                </td>
                <td>
                  <DeleteButton onClick={() => handleDelete(pri.id)}>
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
            handleUpdate(idSelected)
          }}
        >
          <h2>Editar pri</h2>
          <input
            type='text'
            placeholder='Nome da pri'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
            placeholder='Descri????o da pri'
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
            priItems.length > 0 && <label>Pdi Itens</label>
          }
          {
            priItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    defaultValue={e.nome}
                    onChange={(e) => handleChangeState(i, e, priItems, setPriItems)}
                  />

                  <label htmlFor="">Descri????o</label>
                  <input
                    type="text"
                    name="descricao"
                    defaultValue={e.descricao}
                    onChange={(e) => handleChangeState(i, e, priItems, setPriItems)}
                  />
                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => {
                      removeFormFields(i, priItems, setPriItems)
                    }}
                  >
                    <FiTrash />
                  </button>
                </div>


              )
            )
          }

          {
            priItemsNew.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    onChange={(e) => handleChangeState(i, e, priItemsNew, setPriItemsNew)}
                  />
                  <label htmlFor="">Descri????o</label>
                  <div className="return">
                    <input
                      type="text"
                      name="descricao"
                      onChange={(e) => handleChangeState(i, e, priItemsNew, setPriItemsNew)}
                    />
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => removeFormFields(i, priItemsNew, setPriItemsNew)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>


              )
            )
          }

          <button type='button' onClick={() => addFormFields(priItemsNew, setPriItemsNew)}>
            <FiPlus />
          </button>

          <S.ContainerBntFlex>
            <button type='submit'>Enviar</button>
          </S.ContainerBntFlex>

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
          <h2>Cadastrar pri</h2>
             <h4>PRI</h4>

          <label htmlFor=''>Nome da pri</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da pri'
            required
          />

          <label htmlFor=''>Descri????o da pri</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descri????o da pri'
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
            priItems.length > 0 && <label>Pdi Itens</label>
          }
          {
            priItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    onChange={(e) => handleChangeState(i, e, priItems, setPriItems)}
                  />

                  <label htmlFor="">Descri????o</label>
                  <div className="return">
                    <input
                      type="text"
                      name="descricao"
                      onChange={(e) => handleChangeState(i, e, priItems, setPriItems)}
                    />
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => removeFormFields(i, priItems, setPriItems)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>


              )
            )
          }

          <button type='button' onClick={() => addFormFields(priItems, setPriItems)}>
            <FiPlus />
          </button>


          <S.ContainerBntFlex>
            <button type='submit'>Enviar</button>
          </S.ContainerBntFlex>

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
            handleFilterPri()
          }}
        >
          <h2>Filtros</h2>

          <label htmlFor=''>Nome da pri</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome da pri'
          />

          <label htmlFor=''>Descri????o da pri</label>
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descri????o da pri'
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
