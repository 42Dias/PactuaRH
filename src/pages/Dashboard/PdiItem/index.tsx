import 'antd/dist/antd.css';

import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { AiFillQuestionCircle } from 'react-icons/ai'


import * as S from './Pdi.styled'
import { useEffect, useState } from 'react'
import pdiItemService from 'service/pdiItem/pdiItem'
import { fullName } from 'service/api'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { useParams } from 'react-router-dom'

import { FiPlus, FiEdit, FiTrash, FiX, FiFilter,FiArrowRight, FiCheck } from 'react-icons/fi'
import { Select } from 'antd'
import LoadingLayer from 'ui/components/LoadingLayer';
const { Option } = Select;


export default function PdiItem() {

  
/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/

  let { id }  = useParams();

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [nome, setNome] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [idSelected, setId] = useState<string>('')
  const [pdi, setPdi] = useState<any[]>([])
  const [atividade, setAtividade] = useState<string>('')

  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')


  const [loading, setLoading] = useState(true);


/*
==========================================================================================================
                                        MODAL FUNCTIONS
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
/*
==========================================================================================================
                                        CRUD FUNCTIONS
==========================================================================================================
*/

  async function handleLoadPdi() {
    
    
    let idSelectedPath = window.location.pathname
    let idSelected = idSelectedPath.replace('/pdi-item/', '')
    const allPdi = await pdiItemService.listWithFilter('pdiId', idSelected)    
    setPdi(allPdi)

    setLoading(false)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: desc,
      pdiId: id,
      atividade: atividade,
    }

    const isCreated = await pdiItemService.create(data)

    if (isCreated) closeModalNew()
    await handleLoadPdi()
  }

  async function handleUpdate(idSelected: string) {
    const data = {
      nome: nome,
      descricao: desc,
      atividade: atividade,
    }

    const isUpdated = await pdiItemService.update(idSelected, data)

    if (isUpdated) closeModal()
    await handleLoadPdi()
  }

  useEffect(() => {
    handleLoadPdi()
  }, [])

  async function handleDelete(idSelected: string) {
    await pdiItemService.delete(idSelected)

    handleLoadPdi()
  }
/*
==========================================================================================================
                                  Handle Update Avaliations
==========================================================================================================
*/

  
  async function handleUpdateAvaliation(objectKey: string, value: string, pri: any){
    pri[objectKey] = value

    let id = pri.id
    const isUpdated = await pdiItemService.update(id, pri)
    
  }

/*
==========================================================================================================
                                            Filters
==========================================================================================================
*/

  async function handleFilterPdi() {
    let pdiId = id
    let filter = `filter%5BpdiId%5D=${pdiId}`



    if (nomeFilter) {
      
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter) {
      

      if (filter.length != 0) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
    }

    const areaFilted = await pdiItemService.listWithManyFilters(filter)

    setPdi(areaFilted)

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
              table='pdi'
              filename='Pactua PDI Item Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>

          <S.Table id='pdi'>
            <S.TrTitle>
              <td>Nome da pdi</td>
              <td>Usu??rio</td>
              <td>RH</td>
            </S.TrTitle>

            {pdi.map((pdi) => (
              <S.TrSecond key={pdi.idSelected}>
                <td>{pdi.nome}</td>
                <td>
                  <Select
                  defaultValue={pdi.avaliacaoUsuario}
                  style={{ width: 120 }} 
                  onChange={value => handleUpdateAvaliation("avaliacaoUsuario", value, pdi)}
                  >
                    <Option value="feito">
                    Feito <FiCheck />
                    </Option>
                    <Option value="Naofeito">
                      N??o Feito <FiX />
                    </Option>
                    <Option value="emAndamento">
                      Em Andamento <AiFillQuestionCircle />
                    </Option>
                  </Select>
                </td>
                <td>
                  <Select
                  defaultValue={pdi.avaliacaoRH}
                  style={{ width: 120 }}
                  onChange={value => handleUpdateAvaliation("avaliacaoRH", value, pdi)}
                  >
                    <Option value="feito">
                    Feito <FiCheck />
                    </Option>
                    <Option value="Naofeito">
                      N??o Feito <FiX />
                    </Option>
                    <Option value="emAndamento">
                      Em Andamento <AiFillQuestionCircle />
                    </Option>
                  </Select>
                </td>

                <td>
                  <button
                    onClick={() => {
                      setId(pdi.id)
                      setNome(pdi.nome)
                      setDesc(pdi.descricao)
                      setAtividade(pdi.atividade)
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
            handleUpdate(idSelected)
          }}
        >
          <h2>Editar pdi</h2>
          <input
            type='text'
            placeholder='Nome da pdi'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
            placeholder='Descri????o da pdi'
            required
          />

        <textarea
            onChange={(e) => setAtividade(e.target.value)}
            defaultValue={atividade}
            placeholder='atividade da pdi'
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
          <h2>Cadastrar pdi</h2>

          <label htmlFor=''>Nome da pdi</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da pdi'
            required
          />

          <label htmlFor=''>Descri????o da pdi</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descri????o da pdi'
            required
          />

          <textarea
            onChange={(e) => setAtividade(e.target.value)}
            defaultValue={atividade}
            placeholder='atividade da pdi'
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

          <label htmlFor=''>Descri????o da pdi</label>
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descri????o da pdi'
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
