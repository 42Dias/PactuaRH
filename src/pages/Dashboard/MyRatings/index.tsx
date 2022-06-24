import { FiEdit, FiEdit2, FiPlay, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './MyRatings.styled'
import { Switch } from 'antd'
import { useState } from 'react'
import Modal from 'react-modal'

interface PropsModal {
  title?: string;
  value?: string;
  valueModal?: number;
  titleConfig?: string;
  checkBoxTitle?: string;
  titleAvaliation?: string;
  to?: string;
}

export function MyRatings() {
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
            <h2>Minhas avaliações</h2>
          </S.FlexInit>

          <div className='box-avaliacoes'>
            <span>Desempenho</span>

            <div className='flex-configs'>
              <Link to='/respostas' className='settings'>
                <FiPlay />
                <span>Iniciar</span>
              </Link>
            </div>
          </div>

          <div className='box-avaliacoes'>
            <span>Avaliação 2</span>

            <div className='flex-configs'>
              <Link to='/respostas' className='settings'>
                <FiPlay />
                <span>Iniciar</span>
              </Link>
            </div>
          </div>

          <div className='box-avaliacoes'>
            <span>Avaliação 3</span>

            <div className='flex-configs'>
              <Link to='/respostas' className='settings'>
                <FiPlay />
                <span>Iniciar</span>
              </Link>
            </div>
          </div>
        </S.Container>
      </S.Body>      
    </>
  )
}