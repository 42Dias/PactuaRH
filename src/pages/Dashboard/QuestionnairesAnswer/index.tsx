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

export default function QuestionariosAnswer() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)
  const [resposta, setResposta] = useState<string>('')
  // const [desc, setDesc] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [questionariosAnswer, setquestionariosAnswer] = useState<any[]>([])

  const [respostaFilter, setRespostaFilter] = useState<string>('')
  // const [descricaoFilter, setDescricaoFilter] = useState<string>('')

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
    setRespostaFilter('')
    // setDescricaoFilter('')
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

  async function handleLoadquestionariosAnswer() {
    const allquestionariosAnswer = await questionariosResposta.list()

    setquestionariosAnswer(allquestionariosAnswer)
  }

  async function handleCreate() {
    const data = {
      resposta: resposta,
      // descricao: desc,
    }

    const isCreated = await questionariosResposta.create(data)

    if (isCreated) closeModalNew()
    await handleLoadquestionariosAnswer()
  }

  async function handleUpdate(id: string) {
    const data = {
      resposta: resposta,
      // descricao: desc,
    }

    const isUpdated = await questionariosResposta.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadquestionariosAnswer()
  }

  useEffect(() => {
    handleLoadquestionariosAnswer()
  }, [])

  async function handleDelete(id: string) {
    await questionariosResposta.delete(id)

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
      console.log('tem resposta')
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bresposta%5D=${respostaFilter}`
    }
    // if (descricaoFilter) {
    //   console.log('tem desc')

    //   if (filter.length != 0) filter += '&'
    //   filter += `filter%5Bdescricao%5D=${descricaoFilter}`
    // }

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
              table='questionariosresposta'
              filename='Pactua Benefícios Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>

          <S.Table id='questionariosresposta'>
            <S.TrTitle>
              <td>Resposta da questionariosresposta</td>
              <td>Descrição</td>
            </S.TrTitle>

            {questionariosAnswer.map((questionariosAnswer) => (
              <S.TrSecond key={questionariosAnswer.id}>
                <td>{questionariosAnswer.resposta}</td>
                <td>{questionariosAnswer.descricao}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(questionariosAnswer.id)
                      setResposta(questionariosAnswer.resposta)
                      // setDesc(questionariosAnswer.descricao)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(questionariosAnswer.id)}>
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
          <h2>Editar questionariosresposta</h2>
          <input
            type='text'
            placeholder='Resposta da questionariosresposta'
            defaultValue={resposta}
            onChange={(e) => setResposta(e.target.value)}
          />
          {/* <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
            placeholder='Descrição da questionariosresposta'
            required
          /> */}

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
          <h2>Cadastrar questionariosresposta</h2>

          <label htmlFor=''>Resposta da questionariosresposta</label>
          <input
            type='text'
            onChange={(e) => setResposta(e.target.value)}
            placeholder='Resposta da questionariosresposta'
            required
          />

          {/* <label htmlFor=''>Descrição da questionariosresposta</label>
          <input
            type='text'
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Descrição da questionariosresposta'
            required
          /> */}

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

          <label htmlFor=''>Resposta da questionariosresposta</label>
          <input
            type='text'
            onChange={(e) => setRespostaFilter(e.target.value)}
            placeholder='Resposta da questionariosresposta'
          />

          {/* <label htmlFor=''>Descrição da questionariosresposta</label>
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descrição da questionariosresposta'
          /> */}

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
