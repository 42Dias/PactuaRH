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
import LoadingLayer from 'ui/components/LoadingLayer'
import EditButton from 'ui/components/EditBtn'
import DeleteButton from 'ui/components/DeleteButton'

export default function FunctionsPage() {

  //===================================== Modal's States
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)


  //===================================== CRUD's States
  const [allFuncoes, setAllFuncoes] = useState([])
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [funcEdit, setFunctionEdit] = useState<any>({})


  //===================================== Filter's States
  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')



  const [loading, setLoading] = useState(true);


/* 
==========================================================================================================
                                        Modal's Functions
==========================================================================================================
*/ 

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

/* 
==========================================================================================================
                                        Crud's Functions
==========================================================================================================
*/

  async function handleLoadFunctions() {
    
    
    const func = await funcoes.list()
    setAllFuncoes(func)

    setLoading(false)
  }

  async function handleCreateFunction() {
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isCreated = await funcoes.cadastro(data)

    if (isCreated) closeModalNew()
    handleLoadFunctions()
  }

  async function handleUpdateFunction(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
    }

    const isUpdated = await funcoes.update(id, data)

    if (isUpdated) closeModal()
    handleLoadFunctions()
  }

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
    setNomeFilter('')
    setDescricaoFilter('')

  }

  async function deleteFunction(id: string) {
    const isDelete = await funcoes.delete(id)
    handleLoadFunctions()
  }


/* 
==========================================================================================================
                                        Filters's Functions
==========================================================================================================
*/ 

  async function handleFilterFunctions() {
    let filter = ''

    if (nomeFilter) {
      
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter) {
      

      if (filter.length != 0) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
    }

    const functionsFilted = await funcoes.listWithManyFilters(filter)
    setAllFuncoes(functionsFilted)

    closeModalFilter()
  }


/* 
==========================================================================================================
                                          UseEffect
==========================================================================================================
*/ 


  useEffect(() => {
    handleLoadFunctions()
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
              table="func"
              filename="Pactua Benef??cios Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

            <S.Table id="func">
              <S.TrTitle>
                <td>Fun????o</td>
                <td>Descri????o</td>
              </S.TrTitle>

              {allFuncoes.map((func: any, index) => (
                <S.TrSecond key={index}>
                  <td>{func.nome}</td>
                  <td>

                    <span>
                      {func.descricao}
                    </span>
                  
                  </td>
                  <td>
                    <EditButton
                      onClick={() => {
                        setFunctionEdit(func)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </EditButton>
                  </td>
                  <td>
                    <DeleteButton
                      onClick={() => {
                        deleteFunction(func.id)
                      }}
                    >
                      <FiTrash size={18} />
                    </DeleteButton>
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
            handleUpdateFunction(funcEdit.id)
          }}
        >
          <h2>Editar Fun????o</h2>

          <input
            type='text'
            placeholder='Fun????o'
            defaultValue={funcEdit?.nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type='text'
            placeholder='Fun????o'
            defaultValue={funcEdit?.descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {/* <input type='text' placeholder='M??o de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>N??o</option>
          </select>
          <input type='text' placeholder='Grau de instru????o' />
          <input type='text' placeholder='Requisito da fun????o' /> */}
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
            handleCreateFunction()
          }}
        >
          <h2>Cadastrar fun????o</h2>
          
          <label htmlFor="">Nome da fun????o</label>
          <input
            type='text'
            placeholder='Fun????o'
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
          
            placeholder='Descri????o'
            onChange={(e) => setDescricao(e.target.value)}
          />
          {/* <input type='text' placeholder='M??o de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>N??o</option>
          </select>
          <input type='text' placeholder='Grau de instru????o' />
          <input type='text' placeholder='Requisito da fun????o' /> */}

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
          <h2>Filtrar Fun????o</h2>

          <label htmlFor="">Nome da fun????o</label>
          <input
            type='text'
            placeholder='Fun????o'
            onChange={(e) => setNomeFilter(e.target.value)}
          />

          <input
            type='text'
            placeholder='Descri????o'
            onChange={(e) => setDescricaoFilter(e.target.value)}
          />
          {/* <input type='text' placeholder='M??o de obra' />
          <select>
            <option>Trabalho em equipe?</option>
            <option>Sim</option>
            <option>N??o</option>
          </select>
          <input type='text' placeholder='Grau de instru????o' />
          <input type='text' placeholder='Requisito da fun????o' /> */}

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

    </>
  )
}
