import { FiCornerDownLeft, FiEdit, FiEdit2, FiPlay, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './Answer.styled'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import questionario from 'service/questionarios/'
import { iQuestoes, iQuestoesPeguntas } from 'types'
import questionarioPonto from 'service/questionarioPonto/questionarioPonto'
import { toast } from 'react-toastify'

export function Answer() {

/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/


  const { id } = useParams()
  
  const [modalIsOpen      , setIsOpen          ] = useState(false)
  const [questions        , setQuestions       ] = useState<iQuestoes[]>([])
  const [userAnweser      , setUserAnweser    ] = useState<any>()
  const [questionAnwesers , setQuestionAnwesers] = useState<iQuestoes[]>([])
  const [selectedQuestion, setSelectedQuestion ] = useState<iQuestoes>()



/*
==========================================================================================================
                                      CRUD FUNCTIONS 
==========================================================================================================
*/


  async function handleLoadAnswerQuestionary() {
    const allAnswerQuestionary = await questionario.listWithFilter("avaliacaoId", id)

    console.log(allAnswerQuestionary)
    setQuestions(allAnswerQuestionary)
  }


/*
==========================================================================================================
                                        UseEffects 
==========================================================================================================
*/

  useEffect(
    () => {
      handleLoadAnswerQuestionary()
    }, []
  )

/*
==========================================================================================================
                                      Modal Functions 
==========================================================================================================
*/

  function openModal () {
    setIsOpen(!modalIsOpen);
  }

  function closeModal() {
    setIsOpen(false)
  }

/*
==========================================================================================================
                                Page's SubComponents 
==========================================================================================================
*/

  function Status() {
    const [isActiveColor, setIsActiveColor] = useState(false)

    function changeColor() {
      if (isActiveColor === false) {
        setIsActiveColor(true)
      } else {
        setIsActiveColor(false)
      }
    }

    return (
      <span
        onClick={changeColor}
        className={`${isActiveColor ? 'activeColor' : ''}`}
      />
    )
  }



/*
==========================================================================================================
                                      Functions 
==========================================================================================================
*/

  function handleOpenModal(selectedQuestion: iQuestoes){
    setQuestionAnwesers(selectedQuestion?.questionarioResposta!)
    console.log(selectedQuestion?.questionarioResposta!)
    handleSetDefaultValues(selectedQuestion)
    setSelectedQuestion(selectedQuestion)
    openModal()
  }


  function handleSetDefaultValues(allAnswerQuestionary: iQuestoes){
    const {questionarioId, id, questionarioResposta} = allAnswerQuestionary
    let isAnswered = false;

    console.log(allAnswerQuestionary)

    questionarioResposta?.map(
      (answer) => {
        console.log(answer)
        console.log(answer.questionarioPonto?.length! >= 1)
        if( answer.questionarioPonto?.length! >= 1) isAnswered = true
      }
    )

    const defaultAnswer = {
      questionarioId:     questionarioId,
      // questionarioId: id,
      respostaId:         '',
      pontuacao:          0,
      isAnswered: isAnswered,
    }

    setUserAnweser(defaultAnswer)
  }


  function handleSetAnwser(value: string , id: string){
    let awnsers = userAnweser

    awnsers.resposta               = value
    awnsers.questionarioRespostaId = id
    
    setUserAnweser(awnsers)
  }


  async function handleSubmitAnswer(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    await questionarioPonto.create(userAnweser)
    
    toast.success("Resposta enviada com sucesso")

    handleLoadAnswerQuestionary()
    closeModal()
  }


  // console.log(userAnweser)




  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>
            <S.LinksScore>
              <div>
                <Status />
                <small>Avaliação</small>
              </div>

              <div>
                <Status />
                <small>Iniciativa ou KPI</small>
              </div>

            </S.LinksScore>
          </S.Container>
        </S.Title>

        <S.Container>
          <S.LinksContainer>
            <Link className='active-class' to='/cadastro-de-avaliacao'>Avaliação &gt;</Link>
            <Link to='/avaliacao'>Iniciativa ou KPI &gt;</Link>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Resposta de Questionário 1</h2>
          </S.FlexInit>
          {
            questions.map(
              (question: iQuestoes) => (
                <div className='box-avaliacoes' key={question.id}>
                  <span>
                    {question.nome}
                  </span>
                  <div className='flex-configs'>
                    <button onClick={() => handleOpenModal(question)} className='settings'>
                      <FiCornerDownLeft />
                      <span>Responder</span>
                    </button>
                  </div>
                </div>
              )
            )
          }


          {/* <div className='box-avaliacoes'>
            <span>...?</span>

            <div className='flex-configs'>
              <button onClick={openModal} className='settings'>
                <FiCornerDownLeft />
                <span>Responder</span>
              </button>
            </div>
          </div>
          */}

        </S.Container>
      </S.Body>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          type='button'
          onClick={closeModal}
          className='react-modal-close'
        >
          <FiX />
        </button>

        {"numerico" ? (
          <S.ContainerForm
            onSubmit={(e) => handleSubmitAnswer(e)}
          >

            <h1>{selectedQuestion?.nome}</h1>
            {/* <label htmlFor="">Com que frequência você se sente deprimido?</label>
          <textarea placeholder="Responda aqui...."></textarea> */}
            {
              questionAnwesers.map(
                (answer) => (
                  <S.AnswersContainer key={answer.id}>
                    <input
                      type="text"

                      required
                      id={answer?.id}

                      pattern="[0-9]*"

                      //@ts-ignore
                      defaultValue={answer?.questionarioPonto[0]?.resposta!}
                      placeholder="Responda aqui...."

                      onChange={
                        ({ target }) => {
                          target.value = target.value.replace(/\D/g, "");
                          handleSetAnwser(target.value, target.id);
                        }
                      }
                    />
                  </S.AnswersContainer>
                )
              )
            }
            <button className='send' type='submit'>Cadastrar</button>
          </S.ContainerForm>
        ) : (
          <S.ContainerForm
            onSubmit={(e) => handleSubmitAnswer(e)}
          >

            <h1>{selectedQuestion?.nome}</h1>
            {/* <label htmlFor="">Com que frequência você se sente deprimido?</label>
          <textarea placeholder="Responda aqui...."></textarea> */}
            {
              questionAnwesers.map(
                (answer) => (
                  <S.AnswersContainer key={answer.id}>
                    <textarea
                      required
                      id={answer?.id}
                      //@ts-ignore
                      defaultValue={answer?.questionarioPonto[0]?.resposta!}
                      placeholder="Responda aqui...."

                      //@ts-ignore
                      disabled={!!answer?.questionarioPonto[0]?.resposta!}
                      onChange={
                        ({ target }) => handleSetAnwser(target.value, target.id)
                      }
                    ></textarea>
                  </S.AnswersContainer>
                )
              )
            }
            <button className='send' type='submit'>Cadastrar</button>
          </S.ContainerForm>
        )
        }
      </Modal>
    </>
  )
}
