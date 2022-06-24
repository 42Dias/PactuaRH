import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './Assessments.styled'

export function Assessments() {
  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, Ryanzinho 😁</S.Container>
        </S.Title>

        <S.Container>
          <h2>Passo a passo</h2>

          <S.GridPasso>
            <Link to='/cadastro-de-avaliacao'>
              <h3>Configurar avaliações</h3>
            </Link>

            <Link to='/minhas-avaliacoes/1'>
              <h3>Envio e aprovação do superior</h3>
            </Link>

            <Link to='cadastro-de-avaliacao'>
              <h3>Iniciar avaliações a cada checkpoint</h3>
            </Link>
          </S.GridPasso>

        </S.Container>
      </S.Body>
    </>
  )
}