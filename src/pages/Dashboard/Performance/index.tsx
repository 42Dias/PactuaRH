import * as S from './Performance'
import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fullName } from 'service/api'


export default function Performance() {
    return(
            <>
             <S.Body>
                <Sidebar />
                <S.Title>
                  <S.Container>Bem vindo, {fullName} 😁</S.Container>
                </S.Title>
              <S.Container>
                <S.Information>
                    <p>Avaliado: Giovanna </p>
                    <p>Cargo: Dev. Júnior </p>
                    <p>Departamento: Dev. Front end </p>
                    <p>Avaliador: Luciano </p>
                </S.Information>


                <S.Information> 
                  <S.Standard> 
                        <p>Critérios </p>
                        <div> 
                            <td> Insuficiente</td>
                            <td >Suficiente</td>
                            <td>Excede</td>
                        </div>

                        <S.TrStandard> 
                          <td> 1 - 4</td>
                          <td> 5 - 7</td>
                          <td> 8 - 10</td>
                        </S.TrStandard> 
                       
                  </S.Standard>
                </S.Information>
                 </S.Container>
              
            
              <S.Container>
                  <S.Table>
                  <p>Avaliação de Desempenho </p>
                      <S.TrTitle>
                        <td>Mês</td>
                        <td >Pontuação</td>
                        <td>Total</td>
                      </S.TrTitle>
                      <S.TrSecond>
                        <td>Janeiro</td>
                        <td>5</td>
                        <td>5</td>
                      </S.TrSecond>
                      <S.TrSecond>
                        <td>Fevereiro</td>
                        <td>3</td>
                        <td>8</td>
                      </S.TrSecond>
                        </S.Table>
                      </S.Container>


                <S.Container> 
                <S.Information>
                <p> Auto Avaliação</p>
                <S.ContainerForm>
                   <input type='text' placeholder='Registre as evidencias que embasaram a nota' />
                </S.ContainerForm>
                  </S.Information>
                   
                  <S.Information>
                  <p> Avaliação do gestor</p>

                  <S.ContainerForm>
                     <input type='text' placeholder='Registre as evidencias que embasaram a nota' />
                  </S.ContainerForm>
                  <S.Button>
                      <button> Enviar </button>
                  </S.Button>
                  </S.Information>


                
                </S.Container>

             </S.Body>
            </>
    )
}