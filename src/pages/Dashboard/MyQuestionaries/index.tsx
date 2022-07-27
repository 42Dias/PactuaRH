import { FiEdit, FiEdit2, FiPlay, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './MyQuestionaries.styled'
import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { iQuestoes } from 'types'
import questionarios from 'service/questionarios/'
import avaliacoes from 'service/avaliacoes/avaliacoes'


export function MyQuestionaries() {

  const { id } = useParams()
/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/
  //PageComponents States
  const [avaliations     , setAvaliations     ] = useState<iQuestoes[]>([])

/*
==========================================================================================================
                                    CRUD FUNCTIONS 
==========================================================================================================
*/

  async function handleLoadAnswerQuestionary() {
    const allAnswerQuestionary = await questionarios.listWithFilter("avaliacaoId", id)

    setAvaliations(allAnswerQuestionary)
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
                                        UseEffects 
==========================================================================================================
*/


  useEffect(() => {
    handleLoadAnswerQuestionary()
  }, [])

  console.log(avaliations)


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
                <small>Iniciativa ou KPI</small>
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
            <Link
            className='active-class'
            to='/cadastro-de-avaliacao'
            >
              Avaliação &gt;
            </Link>
            <p
            // to='/avaliacao'
            >
              Iniciativa ou KPI &gt;
              </p>
            <p
            // to='/perguntas'
            >
              Perguntas &gt;
              </p>
            <p
            // to='/'
            >
              Resposta
            </p>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Minhas avaliações</h2>
          </S.FlexInit>

            {
            avaliations.map(
              ({nome, id, questionarioScore}) => (
                <div className='box-avaliacoes' key={id}>
                  <span>{nome}</span>
                  <div className='flex-configs'>
                    <Link to={
                      questionarioScore[0].formato != 'naoNumerico' ?
                      `/responder/${id}`: `/responder-nao-numerico/${id}`
                      } className='settings'>
                      <FiPlay />
                      <span>Iniciar</span>
                    </Link>
                  </div>
                </div>
              )
            )
            }
        </S.Container>
      </S.Body>      
    </>
  )
}
