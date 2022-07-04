import { FiCornerDownLeft, FiEdit, FiEdit2, FiPlay, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './Answer.styled'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import questionarioItem from 'service/questionarioItem/questionarioItem'
import { iQuestoes, iQuestoesPeguntas } from 'types'

export function Answer() {

/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/


  const { id } = useParams()
  
  const [modalIsOpen      , setIsOpen          ] = useState(false)
  const [questions        , setQuestions       ] = useState<iQuestoes[]>([])
  const [userAnwesers     , setUserAnwesers    ] = useState<iQuestoes[]>([])
  const [questionAnwesers , setQuestionAnwesers] = useState<iQuestoes[]>([])
  const [selectedQuestion, setSelectedQuestion ] = useState<iQuestoes>()



/*
==========================================================================================================
                                      CRUD FUNCTIONS 
==========================================================================================================
*/


  async function handleLoadAnswerQuestionary() {
    const allAnswerQuestionary = await questionarioItem.listWithFilter("questionarioId", id)

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
    setSelectedQuestion(selectedQuestion)
    openModal()
  }


  function handleSetAnwser(value: string , id: string, index: number){
    let awnsers = [...userAnwesers]

    awnsers[index].pontuacao  = parseFloat(value)
    awnsers[index].questionarioRespostaId = id


    setUserAnwesers(awnsers)
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
                <small>Score</small>
              </div>

              <div>
                <Status />
                <small>Questionário</small>
              </div>

              <div>
                <Status />
                <small>Score</small>
              </div>

              <div>
                <Status />
                <small>Perguntas</small>
              </div>
            </S.LinksScore>
          </S.Container>
        </S.Title>

        <S.Container>
          <S.LinksContainer>
            <Link className='active-class' to='/cadastro-de-avaliacao'>Avaliação &gt;</Link>
            <Link to='/avaliacao'>Questionário &gt;</Link>
            <Link to='/perguntas'>Perguntas &gt;</Link>
            <Link to='/'>Resposta</Link>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Resposta de Questionário 1</h2>
          </S.FlexInit>
          {
            questions.map(
              (question: iQuestoes) => (
                <div className='box-avaliacoes'>
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
          </div> */}
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
          // onSubmit={handleCreateNewTransaction}
        >
          
          <h1>{ selectedQuestion?.nome }</h1>
          {/* <label htmlFor="">Com que frequência você se sente deprimido?</label>
          <textarea placeholder="Responda aqui...."></textarea> */}
          {/* <label htmlFor=""></label>
          <textarea placeholder="Responda aqui...."></textarea> */}

          {
            questionAnwesers.map(
              ( answer, i ) => (
                <S.AnswersContainer>
                  <input
                    required
                    type="radio"
                    value={answer.resultado}
                    name={answer.id}
                    id={answer.id}
                    onChange={
                      ({target}) => handleSetAnwser(target.value, target.id, i)
                    }
                  />
                  <label htmlFor="1">
                    {answer.resposta}
                  </label>
                </S.AnswersContainer>
              )
            )
          }



          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
