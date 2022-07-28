import { FiCheck, FiPlay } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './MyRatings.styled'
import { useEffect, useState } from 'react'
import { iQuestoes } from 'types'
import avaliacoes from 'service/avaliacoes/avaliacoes'
import InfoHover from 'ui/components/HoverInfo'


export function MyRatings() {



  /*
  ==========================================================================================================
                                          STATES
  ==========================================================================================================
  */
  //PageComponents States
  const [avaliations, setAvaliations] = useState<iQuestoes[]>([])

  /*
  ==========================================================================================================
                                      CRUD FUNCTIONS 
  ==========================================================================================================
  */

  async function handleLoadAnswerQuestionary() {

    const allAnswerQuestionary = await avaliacoes.list()

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


  return (
    <>
      <S.Body>
        <Sidebar />

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
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Minhas avaliações</h2>
          </S.FlexInit>

          {
            avaliations.map(
              ({ nome, id, isFinalizada }) => (
                <div className='box-avaliacoes' key={id}>
                  <span>{nome}</span>
                  <div className='flex-configs'>
                    {
                      isFinalizada ? (
                        <InfoHover
                            infoContent="Avaliação finalizada, não é possivel refazê-la"
                            >
                              <div className="settings">
                                Finalizada
                                <FiCheck size={18} />
                              </div>
                          </InfoHover>
                      ) : (

                        <Link
                          to={`/responder/${id}`}
                          className='settings'>
                          <FiPlay />
                          <span>Iniciar</span>
                        </Link>

                      )
                    }
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
