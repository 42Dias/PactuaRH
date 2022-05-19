import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Checkpoints.styled'
import { useEffect, useState } from 'react'
import checkpoint from '../../../service/checkpoint/checkpoint'
import { fullName } from 'service/api'

import pdiService from 'service/pdi/pdi'
import priIService from 'service/pri/pri'

import avaliacoes from 'service/avaliacoes/avaliacoes'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import stateHandler from 'utils/changeStatesHandlers'

export default function Checkpoints() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)

  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')

  const [dataInicio, setDataInicio] = useState<string>('')
  const [dataFim, setDataFim] = useState<string>('')

  const [avaliation, setAvaliation] = useState<string>('')
  const [pdi, setPdi] = useState<string>('')
  const [pri, setPri] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const [allAvaliacao, setAllAvaliacao] = useState([])
  const [allPdi, setAllPdi] = useState([])
  const [allPri, setAllPri] = useState([])

  const [id, setId] = useState<string>('')
  const [checkpoints, setCheckpoints] = useState<any[]>([])

  const [nomeFilter, setNomeFilter] = useState<string>('')
  const [descricaoFilter, setDescricaoFilter] = useState<string>('')
  const [dataInicioFilter, setDataInicioFilter] = useState<string>('')
  const [dataFimFilter, setDataFimFilter] = useState<string>('')

  const [priItems, setPriItems] = useState<any[]>([])
  const [pdiItems, setPdiItems] = useState<any[]>([])
  const [avaliations, setAvaliations] = useState<any[]>([])

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
    setNomeFilter('')
    setDescricaoFilter('')
    setAvaliation('')
    setPdi('')
    setPri('')
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setNomeFilter('')
    setDescricaoFilter('')
    setDataInicio('')
    setDataFim('')
    setAvaliation('')
    setPdi('')
    setPri('')


    setAvaliations( [] )
    setPdiItems( [] )
    setPriItems( [] )



    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setNomeFilter('')
    setDescricaoFilter('')
    setAvaliation('')
    setDataInicio('')
    setDataFim('')
    setPdi('')
    setPri('')

    setAvaliations( [] )
    setPdiItems( [] )
    setPriItems( [] )

    
    setIsOpenNew(false)
  }

  async function handleLoadCheckpoints() {
    const allCheckpoints = await checkpoint.list()

    setCheckpoints(allCheckpoints)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim),
      
      // avaliacao: avaliation,
      // PDI: pdi,
      // pri: pri,

      avaliacao: avaliations,
      PDI: pdiItems,
      pri: priItems,


      status: status,
    }

    console.log(data)

    const isCreated = await checkpoint.create(data)

    if (isCreated) closeModalNew()
    await handleLoadCheckpoints()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim),


      // avaliacao: avaliation,
      // PDI: pdi,
      // pri: pri,

      avaliacao: avaliations,
      PDI: pdiItems,
      pri: priItems,


      status: status,
    }

    const isUpdated = await checkpoint.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadCheckpoints()
  }

  async function handleLoadPdi() {
    const pdi = await pdiService.list()

    setAllPdi(pdi)
  }

  async function handleLoadPri() {
    const pri = await priIService.list()

    setAllPri(pri)
  }

  async function handleLoadAvaliacao() {
    const avaliacaoList = await avaliacoes.list()

    setAllAvaliacao(avaliacaoList)
  }

  useEffect(() => {
    handleLoadCheckpoints()
    handleLoadPdi()
    handleLoadPri()
    handleLoadAvaliacao()
  }, [])

  async function handleDelete(id: string) {
    await checkpoint.delete(id)

    handleLoadCheckpoints()
  }

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

    if (dataInicioFilter) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BdataInicio%5D=${dataInicioFilter}`
    }

    if (dataFimFilter) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BdataFim%5D=${dataFimFilter}`
    }

    const checkpointFilted = await checkpoint.listWithManyFilters(filter)

    setCheckpoints(checkpointFilted)

    closeModalFilter()
  }

  function handleSetArrays(arrayOfObject: any){
    stateHandler.setJustIdsOfArrayObject(arrayOfObject?.avaliacao, setAvaliations)
    stateHandler.setJustIdsOfArrayObject(arrayOfObject?.PDI, setPdiItems)
    stateHandler.setJustIdsOfArrayObject(arrayOfObject?.pri, setPriItems)

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
              table='checkpoints'
              filename='Pactua Checkpoints Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>

          <S.Table id='checkpoints'>
            <S.TrTitle>
              <td>Nome do Checkpoint</td>
              <td>Descrição</td>
              <td>Data inicial</td>
              <td>Data final</td>
            </S.TrTitle>

            {checkpoints.map((checkpoint) => (
              <S.TrSecond>
                <td>{checkpoint.nome}</td>
                <td>{checkpoint.descricao}</td>
                <td>{checkpoint.dataInicio}</td>
                <td>{checkpoint.dataFim}</td>
                <td>
                  <button
                    onClick={() => {
                      handleSetArrays(checkpoint)
                      setId(checkpoint.id)
                      setNome(checkpoint.nome)
                      setDescricao(checkpoint.descricao)
                      setDataInicio(checkpoint.dataInicio)
                      setDataFim(checkpoint.dataFim)
                      // setAvaliation(checkpoint.avaliacao)
                      // setPdi(checkpoint.pdi)
                      // setPri(checkpoint.pri)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(checkpoint.id)}>
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
          <h2>Editar Checkpoint</h2>
          <label htmlFor=''>Nome do Checkpoint</label>
          <input
            type='text'
            placeholder='Nome do Checkpoint'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label htmlFor=''>Descrição</label>
          <input
            type='text'
            placeholder='Descrição'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <label htmlFor=''>Data inicial</label>
          <input
            type='date'
            placeholder='Data inicial'
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />

          <label htmlFor=''>Data final</label>
          <input
            type='date'
            placeholder='Data Final'
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />

          {/*
          <label htmlFor=''>Avaliação</label>
          <S.SelectPai
            onChange={(e) => {
              setAvaliation(e.target.value)
            }}
            placeholder='Avaliação'
            value={avaliation}
          >
            {allAvaliacao.map((value: any, index) => (
              <S.OptionsPai key={index} value={value.id}>
                {value.nome}
              </S.OptionsPai>
            ))}
          </S.SelectPai>
          */}

          {/* <label htmlFor=''>PDI</label>
          <S.SelectPai
            onChange={(e) => {
              setPdi(e.target.value)
              console.log(e)
            }}
            placeholder='PDI'
            value={pdi}
          >
            {allPdi.map((value: any, index) => (
              <S.OptionsPai key={index} value={value.id}>
                {value.nome}
              </S.OptionsPai>
            ))}
          </S.SelectPai>
          <label htmlFor=''>PRI</label>
          <S.SelectPai
            onChange={(e) => {
              setPri(e.target.value)
            }}
            placeholder='PRI'
            value={pri}
          >
            {allPri.map((value: any, index) => (
              <S.OptionsPai key={index} value={value.id}>
                {value.nome}
              </S.OptionsPai>
            ))}
          </S.SelectPai> */}


          <label htmlFor=''>Avaliações</label>
          {
            avaliations.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor=''>Selecione a Avaliação</label>
                  <div className="return">
                    <S.SelectPai
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, avaliations, setAvaliations)}
                      placeholder='Avaliação'
                      defaultValue={e}
                    >
                      <S.OptionsPai hidden>Selecione</S.OptionsPai>
                      {allAvaliacao.map((value: any, index) => (
                        <S.OptionsPai key={index} value={value.id}>
                          {value.nome}
                        </S.OptionsPai>
                      ))}
                    </S.SelectPai>
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, avaliations, setAvaliations)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

          <button type='button' onClick={() => stateHandler.addFormFields(avaliations, setAvaliations)}>
            <FiPlus />
          </button>

          <label htmlFor=''>PDI</label>
          {
            pdiItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor=''>Selecione a PDI</label>
                  <div className="return">
                    <S.SelectPai
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, pdiItems, setPdiItems)}
                      placeholder='PdI'
                      defaultValue={e}
                    >
                      <S.OptionsPai hidden>Selecione</S.OptionsPai>
                      {allPdi.map((value: any, index) => (
                        <S.OptionsPai key={index} value={value.id}>
                          {value.nome}
                        </S.OptionsPai>
                      ))}
                    </S.SelectPai>
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, pdiItems, setPdiItems)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

          <button type='button' onClick={() => stateHandler.addFormFields(pdiItems, setPdiItems)}>
            <FiPlus />
          </button>



          <label htmlFor=''>PRI</label>
          {
            priItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor=''>Selecione a PRI</label>
                  <div className="return">
                    <S.SelectPai
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, priItems, setPriItems)}
                      placeholder='PRI'
                      defaultValue={e}
                    >
                      <S.OptionsPai hidden>Selecione</S.OptionsPai>
                      {allPri.map((value: any, index) => (
                        <S.OptionsPai key={index} value={value.id}>
                          {value.nome}
                        </S.OptionsPai>
                      ))}
                    </S.SelectPai>
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, priItems, setPriItems)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

          <button type='button' onClick={() => stateHandler.addFormFields(priItems, setPriItems)}>
            <FiPlus />
          </button>

          <label htmlFor="">Status</label>
          <input
            type='text'
            placeholder='Status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
          <h2>Cadastrar Checkpoint</h2>

          <label htmlFor=''>Nome do Checkpoint</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome do Checkpoint'
            required
          />

          <label htmlFor=''>Descrição</label>
          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            required
          />

          <label htmlFor=''>Data inicial</label>
          <input
            type='date'
            placeholder='Data inicial'
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />

          <label htmlFor=''>Data final</label>
          <input
            type='date'
            placeholder='Data Final'
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />

          {/* <label htmlFor=''>Avaliação</label>
          <S.SelectPai
            onChange={(e) => {
              setAvaliation(e.target.value)
            }}
            placeholder='Avaliação'
            value={avaliation}
          >
            <S.OptionsPai hidden>Selecione</S.OptionsPai>
            {allAvaliacao.map((value: any, index) => (
              <S.OptionsPai key={index} value={value.id}>
                {value.nome}
              </S.OptionsPai>
            ))}
          </S.SelectPai> */}

          {/*
          <label htmlFor=''>PDI</label>
          <S.SelectPai
            onChange={(e) => {
              setPdi(e.target.value)
            }}
            placeholder='PDI'
            defaultValue={pdi}
          >
            <S.OptionsPai hidden>Selecione</S.OptionsPai>
            {allPdi.map((value: any, index) => (
              <S.OptionsPai key={index} value={value.id}>
                {value.nome}
              </S.OptionsPai>
            ))}
          </S.SelectPai>
          */}
          
          {/*
          <label htmlFor=''>PRI</label>
          <S.SelectPai
            onChange={(e) => {
              setPri(e.target.value)
            }}
            placeholder='PRI'
            defaultValue={pri}
          >
            <S.OptionsPai hidden>Selecione</S.OptionsPai>
            {allPri.map((value: any, index) => (
              <S.OptionsPai key={index} value={value.id}>
                {value.nome}
              </S.OptionsPai>
            ))}
          </S.SelectPai>
          */}

          

          <label htmlFor=''>Avaliações</label>
          {
            avaliations.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor=''>Selecione a Avaliação</label>
                  <div className="return">
                    <S.SelectPai
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, avaliations, setAvaliations)}
                      placeholder='Avaliação'
                      defaultValue={e}
                    >
                      <S.OptionsPai hidden>Selecione</S.OptionsPai>
                      {allAvaliacao.map((value: any, index) => (
                        <S.OptionsPai key={index} value={value.id}>
                          {value.nome}
                        </S.OptionsPai>
                      ))}
                    </S.SelectPai>
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, avaliations, setAvaliations)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

          <button type='button' onClick={() => stateHandler.addFormFields(avaliations, setAvaliations)}>
            <FiPlus />
          </button>

          <label htmlFor=''>PDI</label>
          {
            pdiItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor=''>Selecione a PDI</label>
                  <div className="return">
                    <S.SelectPai
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, pdiItems, setPdiItems)}
                      placeholder='PdI'
                      defaultValue={e}
                    >
                      <S.OptionsPai hidden>Selecione</S.OptionsPai>
                      {allPdi.map((value: any, index) => (
                        <S.OptionsPai key={index} value={value.id}>
                          {value.nome}
                        </S.OptionsPai>
                      ))}
                    </S.SelectPai>
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, pdiItems, setPdiItems)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

          <button type='button' onClick={() => stateHandler.addFormFields(pdiItems, setPdiItems)}>
            <FiPlus />
          </button>



          <label htmlFor=''>PRI</label>
          {
            priItems.map(
              (e, i) => (
                <div className="border">
                  <label htmlFor=''>Selecione a PRI</label>
                  <div className="return">
                    <S.SelectPai
                      onChange={(e) => stateHandler.handleChangeStateOfArray(i, e, priItems, setPriItems)}
                      placeholder='PRI'
                      defaultValue={pri}
                    >
                      <S.OptionsPai hidden>Selecione</S.OptionsPai>
                      {allPri.map((value: any, index) => (
                        <S.OptionsPai key={index} value={value.id}>
                          {value.nome}
                        </S.OptionsPai>
                      ))}
                    </S.SelectPai>
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => stateHandler.removeFormFields(i, priItems, setPriItems)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              )
            )
          }

          <button type='button' onClick={() => stateHandler.addFormFields(priItems, setPriItems)}>
            <FiPlus />
          </button>

          <label htmlFor=''>Status</label>

          <input
            type='text'
            placeholder='Status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

          <label htmlFor=''>Nome do Checkpoint</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome do Checkpoint'
          />
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descrição'
          />

          <input
            type='date'
            onChange={(e) => setDataInicioFilter(e.target.value)}
            placeholder='Data inicial'
          />

          <input
            type='date'
            onChange={(e) => setDataFimFilter(e.target.value)}
            placeholder='Data final'
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
