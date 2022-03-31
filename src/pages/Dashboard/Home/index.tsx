import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import { welcome } from 'assets'
import * as S from './Home.styled'

export default function Home() {
  return (
    <S.Body>
      <Sidebar />
      <S.Title>
        <S.Container>Dashboard</S.Container>
      </S.Title>
      <S.Container>
        <S.ContainerCall>
          <div>
            <h2>Olá, Luciano 😁</h2>
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
            <S.FlexPhoto>
              <S.Photo>
                <img
                  src='https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                  alt='Man'
                />
              </S.Photo>
              <h2>Luciano Barbosa</h2>
            </S.FlexPhoto>
            <S.TitleUser>
              <S.TextDetails>
                <h5>E-mail</h5>
                <p>fulanoDeTal@gmail.com</p>
              </S.TextDetails>

              <S.TextDetails>
                <h5>CPF</h5>
                <p>000.000.000-00</p>
              </S.TextDetails>

              <S.TextDetails>
                <h5>Empresa</h5>
                <p>PactuaRH</p>
              </S.TextDetails>
            </S.TitleUser>
          </S.DetailsUser>
        </S.GridDetails>
      </S.Container>
    </S.Body>
  )
}
