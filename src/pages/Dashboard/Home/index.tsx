import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import { welcome } from 'assets'
import * as S from './Home.styled'
import { api, Email, fullName, getId } from 'service/api'
import { useEffect, useState } from 'react'
import { emitWarning } from 'process'
import profissional from 'service/profissional/profissional'
import { json } from 'stream/consumers'
import { toast } from 'react-toastify'

const avatar = require('./../../../assets/avatar.png')

export default function Home() {
  const [questionarios, setQuestionarios] = useState([])



  async function handleLoadAvaliations(){
    let professionalData = await profissional.listWithFilter("userId", getId())
    
    // professionalData = professionalData[0] || []
    
    // console.log(professionalData)



    // console.log(professionalData.cargo.questionarios)

    // if(professionalData) setQuestionarios(professionalData?.cargo?.questionarios)


  }

  function checkLogin(){
    if(!Email) window.location.reload()
  }

  useEffect(
    () => {
      checkLogin()
      handleLoadAvaliations()
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
          {
            questionarios[0] && questionarios.map(
              (questionario: any) => (
                <S.Content>
                  <div>
                    <h3>{questionario.nome}</h3>
                  </div>
                  <div className='flex-buttons'>
                    <button>Enviar</button>
                    {/* <button onClick={ () => toast.info(questionario.id)}>Ver</button> */}
                    <Link to={`/responder-questionario/${questionario.id}`}
                    // onClick={ () => toast.info(questionario.id)}
                    >
                      Ver
                    </Link>
                  </div>

                </S.Content>
              )
            )}
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
