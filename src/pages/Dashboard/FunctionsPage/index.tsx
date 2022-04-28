import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './FunctionsPage.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import funcoes from 'service/funcoes/funcoes'
import { fullName } from 'service/api'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default function FunctionsPage() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [allFuncoes, setAllFuncoes] = useState([])
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [funcaoEdit, setFuncaoEdit] = useState<any>({})
  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')
  const [subAreaFilter, setSubAreaFilter] = useState<boolean>(false)
  const [areaPaiFilter, setAreaPaiFilter] = useState<string>('')

  async function getAllFuncoes() {
    const funcao = await funcoes.list()
    setAllFuncoes(funcao)
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

  useEffect(() => {
    getAllFuncoes()
  }, [])

  async function createFuncao() {
    const data = {
      nome: nome,
      descricao: descricao,
    }
    console.log(data)
    console.log(data.nome)

    const isCreated = await funcoes.cadastro(data)
    console.log(isCreated)

    if (isCreated) closeModalNew()
    getAllFuncoes()
  }

  async function updateFuncao(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
    }
    console.log(data)
    console.log(data.nome)

    const isUpdated = await funcoes.update(id, data)
    console.log(isUpdated)

    if (isUpdated) closeModal()
    getAllFuncoes()
  }

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
    setNomeFilter('')
    setDescricaoFilter('')
    setAreaPaiFilter('')
  }

  async function deleteFuncao(id: string) {
    const isDelete = await funcoes.delete(id)
    getAllFuncoes()
  }

  async function handleFilterFunctions() {
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

    const functionsFilted = await funcoes.listWithManyFilters(filter)
    setAllFuncoes(functionsFilted)

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
              table="funcao"
              filename="Pactua Benefícios Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

            <S.Table id="funcao">
              <S.TrTitle>
                <td>Função</td>
                <td>Descrição</td>
              </S.TrTitle>

              {allFuncoes.map((funcao: any, index) => (
                <S.TrSecond key={index}>
                  <td>{funcao.nome}</td>
                  <td>{funcao.descricao}</td>
                  <td>
                    <button
                      onClick={() => {
                        setFuncaoEdit(funcao)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteFuncao(funcao.id)
                      }}
                    >
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              ))}
            </S.Table>

          {allFuncoes.length === 0 }
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
          onSubmit={(e: any) => {
            e.preventDefault()
            // e.target.reset()
            updateFuncao(funcaoEdit.id)
          }}
        >
          <h2>Editar Função</h2>

          <input
            type='text'
            placeholder='Função'
            defaultValue={funcaoEdit?.nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type='text'
            placeholder='Função'
            defaultValue={funcaoEdit?.descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {/* <input type='text' placeholder='Mão de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <input type='text' placeholder='Grau de instrução' />
          <input type='text' placeholder='Requisito da função' /> */}
          <button type='submit'>Salvar</button>
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
          onSubmit={(e: any) => {
            e.preventDefault()
            // e.target.reset()
            createFuncao()
          }}
        >
          <h2>Cadastrar função</h2>

          <label htmlFor="">Nome da função</label>
          <input
            type='text'
            placeholder='Função'
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type='text'
            placeholder='Descrção'
            onChange={(e) => setDescricao(e.target.value)}
          />
          {/* <input type='text' placeholder='Mão de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <input type='text' placeholder='Grau de instrução' />
          <input type='text' placeholder='Requisito da função' /> */}

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
          onSubmit={(e: any) => {
            e.preventDefault()
            // e.target.reset()
            handleFilterFunctions()
          }}
        >
          <h2>Filtrar Função</h2>

          <label htmlFor="">Nome da função</label>
          <input
            type='text'
            placeholder='Função'
            onChange={(e) => setNomeFilter(e.target.value)}
          />

          <input
            type='text'
            placeholder='Descrição'
            onChange={(e) => setDescricaoFilter(e.target.value)}
          />
          {/* <input type='text' placeholder='Mão de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <input type='text' placeholder='Grau de instrução' />
          <input type='text' placeholder='Requisito da função' /> */}

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

    </>
  )
}
