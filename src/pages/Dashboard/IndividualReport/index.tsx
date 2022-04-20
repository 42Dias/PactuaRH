import * as S from './IndividualReport.styled'
import Sidebar from 'ui/components/Sidebar'
import { fullName } from 'service/api'


export default function IndividualReport() {
    return(
            <>
             <S.Body>
                <Sidebar />
                <S.Title>
                  <S.Container>Bem vindo, {fullName} 😁</S.Container>
                </S.Title>
                
                <S.InformationTitle> 
                <h3> Recuperação Individual</h3>
                </S.InformationTitle>

                <S.InformationTitle> 
                <p> Competencia a ser desenvolvida: </p>
                </S.InformationTitle>
              <S.Container>
                <S.Information>
                   <p> Ações</p>
                </S.Information>

                <S.Information> 
                 <p> Resultado Esperado</p>
                </S.Information>

                <S.Information> 
                  <p> Recursos Necessários</p>
                </S.Information>

                <S.Information> 
                  <p> Prazo </p>
                </S.Information>
                 </S.Container>
                

                 <S.Container>
                  <S.Table>
                  <p>Feedback do gestor </p>
                      <S.TrTitle>
                        <td>Mês</td>
                        <td > Avaliação </td>
                      
                      </S.TrTitle>
                      <S.TrSecond>
                        <td>Janeiro</td>
                        <td></td>

                      </S.TrSecond>
                        </S.Table>
                      </S.Container>
              
            
                      <S.Button>
                      <button> Enviar </button>
                  </S.Button>
             </S.Body>
            </>
    )
}
