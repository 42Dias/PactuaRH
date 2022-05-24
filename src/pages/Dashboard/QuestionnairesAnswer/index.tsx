/* eslint-disable react-hooks/rules-of-hooks */
import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './QuestionnairesAnswer.styled'
import { useEffect, useState } from 'react'
import questionariosResposta from 'service/questionarioResposta/questionarioResposta'
import { fullName } from 'service/api'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import handleSetNumber from 'utils/handleSetNumber'
import { useParams } from 'react-router-dom'

export default function QuestionariosAnswer() {

  const { id } = useParams()



  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [resposta, setResposta] = useState<string>('')
  const [pontuacao, setPontuacao] = useState<string>('')

  const [selectedId, setSelectedId] = useState<string>('')
  const [questionariosAnswer, setquestionariosAnswer] = useState<any[]>([])

  const [respostaFilter, setRespostaFilter] = useState<string>('')
  const [pontuacaoFilter, setPontuacaoFilter] = useState<string>('')

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
    setRespostaFilter('')
    setResposta('')
    setPontuacao('')
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setResposta('')
    setPontuacao('')
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
    setResposta('')
    setPontuacao('')
  }

  async function handleLoadquestionariosAnswer() {
    const allquestionariosAnswer = await questionariosResposta.listWithFilter("questionarioItemId", id)

    setquestionariosAnswer(allquestionariosAnswer)
  }

  async function handleCreate() {
    const data = {
      resposta: resposta,
      resultado: pontuacao,
      questionarioItemId: id,
    }

    const isCreated = await questionariosResposta.create(data)

    if (isCreated) closeModalNew()
    await handleLoadquestionariosAnswer()
  }

  async function handleUpdate(selectedId: string) {
    const data = {
      resposta: resposta,
      resultado: pontuacao,
      questionarioItemId: id,
    }

    const isUpdated = await questionariosResposta.update(selectedId, data)

    if (isUpdated) closeModal()
    await handleLoadquestionariosAnswer()
  }

  useEffect(() => {
    handleLoadquestionariosAnswer()
  }, [])

  async function handleDelete(selectedId: string) {
    await questionariosResposta.delete(selectedId)

    handleLoadquestionariosAnswer()
  }
  /*
==========================================================================================================
                                            Filters
==========================================================================================================
*/

  async function handleFilterquestionariosAnswer() {
    let filter = ''

    if (respostaFilter) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bresposta%5D=${respostaFilter}`
    }
    if (pontuacaoFilter) {
      if (filter.length != 0) filter += '&'
      filter += `filter%resultado%5D=${pontuacaoFilter}`
    }

    const areaFilted = await questionariosResposta.listWithManyFilters(filter)

    setquestionariosAnswer(areaFilted)

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
              table='respostas'
              filename='Respostas Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>

          <S.Table id='respostas'>
            <S.TrTitle>
              <td>Respostas</td>
              <td>Resultado</td>
            </S.TrTitle>

            {questionariosAnswer.map((value: any, key) => (
              <S.TrSecond key={key}>
                <td>{value.resposta}</td>
                <td>{value.resultado}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedId(value.id)
                      setResposta(value.resposta)
                      setPontuacao(value.resultado)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(value.id)}>
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
            handleUpdate(selectedId)
          }}
        >
          <h2>Editar respostas</h2>
          <input
            type='text'
            placeholder='Respostas'
            defaultValue={resposta}
            onChange={(e) => setResposta(e.target.value)}
          />

          <input
            type='text'
            onChange={(e) => setPontuacao(e.target.value)}
            defaultValue={pontuacao}
            placeholder='Pontuação'
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
          <h2>Cadastrar respostas</h2>

          <label htmlFor=''>Resposta</label>
          <input
            type='text'
            placeholder='Resposta'
            defaultValue={resposta}
            onChange={(e) => setResposta(e.target.value)}
          />
          <input
            type='text'
            onChange={(e) => handleSetNumber(e.target.value, setPontuacao)}
            value={pontuacao}
            placeholder='Pontuação'
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
            handleFilterquestionariosAnswer()
          }}
        >
          <h2>Filtros</h2>

          <label htmlFor=''>Resposta</label>
          <input
            type='text'
            onChange={(e) => setRespostaFilter(e.target.value)}
            placeholder='Resposta'
          />

          <label htmlFor=''>Resultado</label>
          <input
            type='text'
            onChange={(e) => setPontuacaoFilter(e.target.value)}
            placeholder='Resultado'
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
