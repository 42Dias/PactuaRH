import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import { welcome } from 'assets'
import * as S from './Home.styled'
import { api, Email, fullName } from 'service/api'
import { useEffect } from 'react'
import { emitWarning } from 'process'

const avatar = require('./../../../assets/avatar.png')

export default function Home() {
  function checkLogin(){
    if(!Email) window.location.reload()

  }

  useEffect(
    () => {
      checkLogin()
    }, []
  )

  return (
    <S.Body>
      <Sidebar />
      <S.Title>
        <S.Container>Dashboard</S.Container>
      </S.Title>
      <S.Container>
        <S.ContainerCall>
          <div>
            <h2>Olá, { fullName } 😁</h2>
            <p>Aproveite ao máximo da nossa plataforma e descubra talentos</p>
            <Link to='/planos'>Planos</Link>
          </div>

          <img src={welcome} alt='Welcome Image' />
        </S.ContainerCall>

        <S.GridDetails>
          <S.ContentUsers>
            <S.Content>
              <div>
                <h3>Desenvolvimento</h3>
              </div>

              <div>
                <button>Enviar</button>
                <button>Ver</button>
              </div>
            </S.Content>
            <S.Content>
              <div>
                <h3>PDI</h3>
              </div>

              <div>
                <button>Enviar</button>
                <button>Ver</button>
              </div>
            </S.Content>
            <S.Content>
              <div>
                <h3>Avaliação geral</h3>
              </div>

              <div>
                <button>Enviar</button>
                <button>Ver</button>
              </div>
            </S.Content>
            <S.Content>
              <div>
                <h3>PRI</h3>
              </div>

              <div>
                <button>Enviar</button>
                <button>Ver</button>
              </div>
            </S.Content>

            <S.Content>
              <div>
                <h3>PRI</h3>
              </div>

              <div>
                <button>Enviar</button>
                <button>Ver</button>
              </div>
            </S.Content>
          </S.ContentUsers>

          <S.DetailsUser>
           {/* <h1>User pertencente a empresaX</h1> */}

            <S.FlexPhoto>
              <S.Photo>
                <img
                  src={avatar}
                  alt='Man'
                />
              </S.Photo>
              <h2>{fullName}</h2>
            </S.FlexPhoto>
            <S.TitleUser>
              <S.TextDetails>
                <h5>E-mail</h5>
                <p>{Email}</p>
              </S.TextDetails>

              {/*
              <S.TextDetails>
                <h5>CPF</h5>
                <p>000.000.000-00</p>
              </S.TextDetails>

              <S.TextDetails>
                <h5>Empresa</h5>
                <p>PactuaRH</p>
              </S.TextDetails>
              */}
            </S.TitleUser>
          </S.DetailsUser>
        </S.GridDetails>
      </S.Container>
    </S.Body>
  )
}
