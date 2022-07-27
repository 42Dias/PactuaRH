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
import avaliacoes from 'service/avaliacoes/avaliacoes'

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
  const [questionAnweser , setquestionAnweser] = useState<iQuestoes>()
  const [selectedQuestion, setSelectedQuestion ] = useState<iQuestoes>()

  const [answerAlreadyMade, setAnswerAlreadyMade ] = useState<iQuestoes>()

  const [format, setFormat ] = useState<string | any>()



/*
==========================================================================================================
                                      CRUD FUNCTIONS 
==========================================================================================================
*/


  async function handleLoadAnswerQuestionary() {
    const allAnswerQuestionary = await questionario.listWithFilter("avaliacaoId", id)

    console.log(allAnswerQuestionary)
    setQuestions(allAnswerQuestionary)

    await checkIfAvaliationIsDone(allAnswerQuestionary)
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

  function openModal() {
    setIsOpen(!modalIsOpen);
  }

  function closeModal() {
    setIsOpen(false)
    setAnswerAlreadyMade(undefined)
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

  /*
  ========== handleOpenModal ==========

  when the modal is open it sets all the states required, such as answer, question and so on
  */ 

  function handleOpenModal(selectedQuestion: iQuestoes) {
    const { questionarioPonto, questionarioScore } = selectedQuestion 

    setFormat(questionarioScore[0]?.formato!)


    if(questionarioPonto[0]){
      console.log("JÁ RESPONDEU HEIN RAPAZ!")
      console.log(questionarioPonto[0])
      setAnswerAlreadyMade(questionarioPonto[0])
    }
    
    setquestionAnweser(selectedQuestion)
    handleSetDefaultValues(selectedQuestion)
    setSelectedQuestion(selectedQuestion)


    openModal()
  }


  /*
  ========== handleSetDefaultValues ==========

  Sets a default json and values to be sent after submit
  */ 
  function handleSetDefaultValues(allAnswerQuestionary: iQuestoes) {
    const { id } = allAnswerQuestionary

    const defaultAnswer = {
      questionarioId: id,
      pontuacao: 0,
      isAnswered: true,
    }

    setUserAnweser(defaultAnswer)
  }



  /*
  ========== handleSetAnwser ==========

  Sets the user answer into the default json
  ========== =============== ==========
  */ 
  function handleSetAnwser(value: string, id: string) {
    let awnsers = userAnweser

    awnsers.resposta = value
    awnsers.questionarioRespostaId = id

    setUserAnweser(awnsers)
  }

  /*
  ========== handleSubmitAnswer ==========

  saves the user's answer into the database
  ========== =================== ==========
  */ 
  async function handleSubmitAnswer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await questionarioPonto.create(userAnweser)

    toast.success("Resposta enviada com sucesso")

    handleLoadAnswerQuestionary()
    closeModal()
  }


  /*
  ========== checkIfAvaliationIsDone ==========

  after the questions are answered, it sets the
  avaliation as done into database!
  ========== ======================= ==========
  */ 

  async function checkIfAvaliationIsDone(questions: iQuestoes[]){
    let questionsAnswered = questions.length

    questions.map(
      (e) => e.questionarioPonto[0] && questionsAnswered--
    )

    console.log(questionsAnswered, "ainda não foram finalizadas")

    const avaliationDefaultValues = await avaliacoes.find(id) 


    console.log("avaliationDefaultValues")
    console.log(avaliationDefaultValues)


    if(questionsAnswered != 0) return;
    


    avaliationDefaultValues.isFinalizada = true

    console.log("avaliationDefaultValues")
    console.log(avaliationDefaultValues)

    avaliacoes.update(id, avaliationDefaultValues)
  }




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


          {/*
          <div className='box-avaliacoes'>
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
        <S.ContainerForm
          onSubmit={(e) => handleSubmitAnswer(e)}
        >
          {
            format === "numerico" ? (
              <>
                <h1>{selectedQuestion?.nome}</h1>
                <S.AnswersContainer key={questionAnweser?.id}>
                  <input
                    type="text"

                    required
                    id={answerAlreadyMade?.id}

                    pattern="[0-9]*"

                    disabled={!!answerAlreadyMade?.resposta!}

                    //@ts-ignore
                    defaultValue={answerAlreadyMade?.resposta!}
                    placeholder="Responda aqui...."

                    onChange={
                      ({ target }) => {
                        target.value = target.value.replace(/\D/g, "");
                        handleSetAnwser(target.value, target.id);
                      }
                    }
                  />
                </S.AnswersContainer>
                <button
                className='send'
                disabled={!!answerAlreadyMade?.resposta!}
                type='submit'>
                  Cadastrar
                </button>
              </>

            ) : (
              <>
                <h1>{selectedQuestion?.nome}</h1>
                <S.AnswersContainer key={answerAlreadyMade?.id}>
                  <textarea
                    required
                    id={answerAlreadyMade?.id}
                    //@ts-ignore
                    defaultValue={answerAlreadyMade?.resposta!}
                    placeholder="Responda aqui...."

                    //@ts-ignore
                    disabled={!!answerAlreadyMade?.resposta!}
                    onChange={
                      ({ target }) => handleSetAnwser(target.value, target.id)
                    }
                  >
                  </textarea>
                </S.AnswersContainer>
                <button
                className='send'
                disabled={!!answerAlreadyMade?.resposta!}
                type='submit'>
                  Cadastrar
                </button>
              </>
            )

          }
        </S.ContainerForm>
      </Modal>
    </>
  )
}
