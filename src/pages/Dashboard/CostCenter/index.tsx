import * as S from './costCenter.styled'
import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { fullName } from 'service/api'
import centroCustos from 'service/centroCustos/centroCustos'
import cargos from 'service/cargos/cargos'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import LoadingLayer from 'ui/components/LoadingLayer'
import EditButton from 'ui/components/EditBtn'
import DeleteButton from 'ui/components/DeleteButton'

export default function CostCenter() {

  //===================================== Modal's States
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)

  //===================================== CRUD's States
  const [nome, setNome] = useState<string>()
  const [descricao, setDescricao] = useState<string>()
  const [codigo, setCodigo] = useState<number | undefined>()

  const [id, setId] = useState<string>('')

  const [cost, setCost] = useState<any[]>([])
  const [allCargos, setCargos] = useState<any[]>([])
  const [cargo, setCargo] = useState<string>('')

  //===================================== Filter's States
  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')

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
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setNome('')
    setDescricao('')
    setCargo('')
    setIsOpen(false)
    setCodigo(undefined)
  }

  function openModalNew() {
    handleLoadCargos()
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

  async function handleLoadCostCenter() {
    const allCostCenter = await centroCustos.list()
    setCost(allCostCenter)
    console.log(allCostCenter, 'allCostCenter')
    setLoading(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleLoadCargos() {
    const allCargos = await cargos.list()
    setCargos(allCargos)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
      cargos: cargo,
      codigo
    }

    const isCreated = await centroCustos.create(data)

    if (isCreated) closeModalNew()
    await handleLoadCostCenter()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
      cargos: cargo,
    }

    const isUpdated = await centroCustos.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadCostCenter()
  }


  async function handleDelete(id: string) {
    await centroCustos.delete(id)

    handleLoadCostCenter()
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


    let areaFilted = await centroCustos.listWithManyFilters(filter)

    setCost(areaFilted)

    closeModalFilter()
  }


  /* 
  ==========================================================================================================
                                            UseEffect
  ==========================================================================================================
  */

  useEffect(() => {
    handleLoadCostCenter()
  }, [])


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
              table="centroCustos"
              filename="Pactua Centro De Custos Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          {cost.length > 0 && (
            <S.Table id="centroCustos">
              <S.TrTitle>
                <td>Nome</td>
                <td>Descri????o</td>
                {/* <td>Cargo</td> */}
              </S.TrTitle>
              {cost.map((c: any, index) => (
                <S.TrSecond key={index}>
                  <td>{c.nome}</td>
                  <td>{c.descricao}</td>
                  {/* <td>
                    {c.cargos.map((cgo: any, index: any) => (
                      <p key={index}>{cgo.nome}</p>
                    ))}
                  </td> */}
                  {/* <td>
                    <button>
                      <Link to='/'>
                        <FiEye size={18} />
                      </Link>
                    </button>
                    </td> */}
                  <td>
                    <EditButton
                      onClick={() => {
                        openEditModal(c)
                      }}
                    >
                      <FiEdit size={18} />
                    </EditButton>
                  </td>
                  <td>
                    <DeleteButton onClick={() => handleDelete(c.id)}>
                      <FiTrash size={18} />
                    </DeleteButton>
                  </td>
                </S.TrSecond>
              ))}
            </S.Table>
          )}

          {cost.length === 0 && <p>N??o h?? dados</p>}
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
          <h2>Editar Centro de Custos</h2>

          <input
            type='text'
            placeholder='Nome'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type='text'
            placeholder='Descri????o'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <S.Select
            placeholder='Cargo'
            id='cargo'
            onChange={(e) => {
              setCargo(e.target.value)
            }}
          >
            {allCargos.map((cg: any, index) => (
              <option value={cg.id} key={index}>
                {cg.nome}
              </option>
            ))}
          </S.Select>

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
          <h2>Cadastrar Centro de Custos</h2>

          <label htmlFor="">Nome do custo</label>
          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="">Descri????o</label>
          <textarea
          
            placeholder='Descri????o'
            onChange={(e) => setDescricao(e.target.value)}
          />

          <label htmlFor="">Cargo</label>
          <S.Select
            placeholder='Cargo'
            id='cargo'
            onChange={(e) => {
              setCargo(e.target.value)
              console.log(e.target.value)
            }}
            value={cargo}
          >
            {allCargos.map((cg: any, index) => (
              <S.Options value={cg.id} key={index}>
                {cg.nome}
              </S.Options>
            ))}
          </S.Select>

          <label htmlFor="">C??digo</label>
          <input
            type='number'
            placeholder='C??digo'
            onChange={(e) => setCodigo(Number(e.target.value))}
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

          <label htmlFor="">Nome do custo</label>
          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setNomeFilter(e.target.value)}
          />

          <label htmlFor="">Descri????o</label>
          <input
            type='text'
            placeholder='Descri????o'
            onChange={(e) => setDescricaoFilter(e.target.value)}
          />

          {/*<label htmlFor="">Cargo</label>
          <S.Select
            placeholder='Cargo'
            id='cargo'
            onChange={(e) => {
              setCargo(e.target.value)
              console.log(e.target.value)
            }}
            value={cargo}
          >
            {allCargos.map((cg: any, index) => (
              <S.Options value={cg.id} key={index}>
                {cg.nome}
              </S.Options>
            ))}
          </S.Select> */ }

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
