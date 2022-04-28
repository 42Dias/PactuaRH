import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Pri.styled'
import { useEffect, useState } from 'react'
import priService from 'service/pri/pri'
import { fullName } from 'service/api'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default function Pri() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [pri, setPri] = useState<any[]>([])

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

  async function handleLoadPri() {
    const allPri = await priService.list()

    setPri(allPri)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: desc,
    }

    const isCreated = await priService.create(data)

    if (isCreated) closeModalNew()
    await handleLoadPri()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: desc,
    }

    const isUpdated = await priService.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadPri()
  }

  useEffect(() => {
    handleLoadPri()
  }, [])

  async function handleDelete(id: string) {
    await priService.delete(id)

    handleLoadPri()
  }
  /*
==========================================================================================================
                                            Filters
==========================================================================================================
*/

  async function handleFilterPri() {
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

    const areaFilted = await priService.listWithManyFilters(filter)

    setPri(areaFilted)

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
              table='pri'
              filename='Pactua PDI Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>

          <S.Table id='pri'>
            <S.TrTitle>
              <td>Nome da pri</td>
              <td>Descrição</td>
            </S.TrTitle>

            {pri.map((pri) => (
              <S.TrSecond key={pri.id}>
                <td>{pri.nome}</td>
                <td>{pri.descricao}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(pri.id)
                      setNome(pri.nome)
                      setDesc(pri.descricao)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(pri.id)}>
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
            placeholder='Descrição da pri'
            required
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
          <h2>Cadastrar pri</h2>

          <label htmlFor=''>Nome da pri</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da pri'
            required
          />

          <label htmlFor=''>Descrição da pri</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descrição da pri'
            required
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

          <label htmlFor=''>Descrição da pri</label>
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descrição da pri'
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}