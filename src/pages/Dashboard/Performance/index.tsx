import * as S from './Performance'
import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Performance() {
    return(
            <>
             <S.Body>
                <Sidebar />
                <S.Title>
                  <S.Container>Bem vindo, Luciano 😁</S.Container>
                </S.Title>
              <S.Container>
                <S.Test>
                   <div>
                    <p>Avaliado: Giovanna </p>
                    <p>Cargo:Dev. Júnior </p>
                    <p>Departamento:Dev. Front end </p>
                    <p>Avaliador:Luciano </p>
                  </div>
                  
                </S.Test>
                <S.Test>
                  <div>
                    <h4> Critérios </h4> 
                    <p> Insuficiente </p>
                    <p> 1 - 4</p>
                    <p> Suficiente</p>
                    <p>5 - 7 </p>
                    <p> Excede </p>
                    <p>  8 - 10</p>

                  </div> 
                </S.Test>
              </S.Container>

              <S.Container>
                
                  <S.Table>
                  <S.TrTitle>
                    <div>
                    <h3> Avaliação de desempenho </h3>
                    </div>
                    </S.TrTitle>
              <S.TrTitle>
                <td>Mês</td>
                <td>Pontuação</td>
                <td>Total</td>
              </S.TrTitle>
              <S.TrSecond>
                <td>Janeiro</td>
                <td>5</td>
                <td>5</td>
              </S.TrSecond>
                </S.Table>
              </S.Container>


                <S.Container> 
                <S.Test>
                <p> Auto Avaliação</p>
                <S.ContainerForm>
                <input type='text' placeholder='Registre as evidencias que embasaram a nota' />
                </S.ContainerForm>
                  </S.Test>
                   
                  <S.Test>
                  <p> Avaliação do gestor</p>
                  <S.ContainerForm>
                  <input type='text' placeholder='Registre as evidencias que embasaram a nota' />
                  </S.ContainerForm>
                  </S.Test>


                  <S.Button>
                      <button> Enviar </button>
                  </S.Button>
                </S.Container>

             </S.Body>
            </>
    )
}