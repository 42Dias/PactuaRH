import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus,  FiEye, FiCheck, FiX, FiFilter } from 'react-icons/fi'
import * as S from './MyAvaliations.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import beneficio from 'service/beneficio/beneficio'
import { fullName, getId } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import profissional from 'service/profissional/profissional'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiFillStar, AiOutlineConsoleSql, AiOutlineStar } from 'react-icons/ai'


export default function MyAvaliations() {
  const [modalIsOpen    , setIsOpen  ] = useState(false)
  const [modalIsOpenNew ,setIsOpenNew] = useState(false)

  const [nome           , setNome           ] = useState<string>('')
  const [myQuestionaries, setMyQuestionaries] = useState<any[]>([])
  const [allData        , setAllData        ] = useState<any>({})
  const [points         , setPoints         ] = useState<any>([{}])
  const [pontuation     , setPontuation     ] = useState<string>('')
  const [allPontuations , setAllPontuations  ] = useState<any>({})
  

    /*
  ==========================================================================================================
                                              MODAL
  ==========================================================================================================
  */

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }


  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {

    setIsOpenNew(false)
  }

  
  /*
  ==========================================================================================================
                                              LOAD
  ==========================================================================================================
  */

  async function handleLoadAvaliations(){
    let professionalData = await profissional.listWithFilter("userId", getId())
    
    professionalData = professionalData[0] || {}
    
    console.log(professionalData)

    setMyQuestionaries(professionalData?.cargo?.questionarios)
    setAllData(professionalData)

  }

  /*
  ==========================================================================================================
                                            HANDLESETVALUES
  ==========================================================================================================
  */


  function checkQuestionaryAvaliation(pontuacoes: any, formato: string, respostas: any){
    let sumOfAnwsers = 0

    respostas.map(
      (item: any) => sumOfAnwsers += item.questionarioResposta.resultado 
    )

    console.log(sumOfAnwsers)


    //sorts the values to descending order
    pontuacoes.sort((previous: any, next: any)=> next.pontuacao - previous.pontuacao )
    pontuacoes.reverse()

    let pontuation = ""


    if(formato == "quantidade"){
      console.log("dentro do if!")

      pontuation = handleCheckPontuationByQuantidy(pontuacoes, sumOfAnwsers)
    }

    else if(formato == "porcentagem"){
      console.log("dentro do if! porcentagem")

      const length = respostas.length

      pontuation = handleCheckPontuationByPercentage(pontuacoes, sumOfAnwsers, length)
    }

    else toast.error("Algo de errado com a Avaliação")


    if(pontuation == "") pontuation = "Abaixo do ponto mínimo"

    setAllPontuations(pontuacoes)

    setPontuation(pontuation)  
    return pontuation
    
  }

  function handleCheckPontuationByQuantidy(items: any, sumOfAnwsers: number){
    let pontuation = ""

    items.map(
      (item: any) => {
        if (item.pontuacao < sumOfAnwsers){
          pontuation = item.nome
        }
      }
    )

    return pontuation
  }


  function handleCheckPontuationByPercentage(items: any, sumOfAnwsers: number, length: number){
    let pontuation = ""

    sumOfAnwsers = sumOfAnwsers / length
    
    console.log(items)
    items.map(
      (item: any) => {
        console.log(`${item.pontuacao} < ${sumOfAnwsers} = ${item.pontuacao < sumOfAnwsers}`)
        console.log(item.pontuacao < sumOfAnwsers && item.nome)

        if (item.pontuacao < sumOfAnwsers){
          pontuation = item.nome
        }
      }
    )

    return pontuation
  }
  

  /*
  ==========================================================================================================
                                              USEEFFECT
  ==========================================================================================================
  */


  useEffect(() => {
    handleLoadAvaliations()
  }, [])

  /*
  ==========================================================================================================
                                              HANDLECLICK
  ==========================================================================================================
  */

  function handleClickButton(questionary: any){
    setNome(questionary.nome)
    setPoints(questionary.questionarioPonto)

    checkQuestionaryAvaliation(
      questionary.questionarioScore[0].item,
      questionary.questionarioScore[0].formato,
      questionary.questionarioPonto,
    )

    openModal()
    
  }


  
  
  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          {/* <S.FlexButtons>
            <div>
              <button onClick={openModalNew}>
                Novo <FiPlus size={18} color='#fff' />
              </button>
              <button 
             
              onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table="myQuestionaries"
              filename="Pactua Benefícios Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>
          */}

          <h3>Minhas Avaliações</h3>

          <S.Table id="myQuestionaries">
            <S.TrTitle>
              <td>Nome da Avaliação</td>
              <td></td>
              <td></td>
            </S.TrTitle>

            {myQuestionaries.map((questionary) => (
              <S.TrSecond>
                <td>{questionary.nome}</td>

                <td>
                {
                questionary.questionarioPonto[0] ? (
                  <button onClick={() => handleClickButton(questionary)}>
                    <FiCheck size={18} />
                  </button>
                ) : (
                  <Link
                  to={`/responder-questionario/${questionary.id}`}
                  className='black-color'
                  >
                    <FiEye size={18} />

                  </Link>
                )
                }
                </td>
                <td>
                {
                questionary.questionarioPonto[0] ? (
                  <button type='button' onClick={() => openModalNew()} >
                    <AiFillStar size={18}/>
                  </button>
                ) : (
                  <button onClick={() => toast.error("Avaliação não finalizada")}  >
                    <AiOutlineStar size={18} />
                  </button>
                )
                }
                </td>
              </S.TrSecond>
            ))}
          </S.Table>

          <br />

          <h3>Avaliações do meu subordinado </h3>
          <S.Table id="myQuestionaries">
            <S.TrTitle>
              <td>Nome da Avaliação</td>
              <td></td>
              <td></td>
            </S.TrTitle>

            {
              allData?.cargo?.cargosLiderados?.map(
                (cargos: any) => (
                  cargos.questionarios?.map(
                    (subordinateQuestionary: any) => (
                      <S.TrSecond>
                        <td>{subordinateQuestionary.nome}</td>
                        <td>
                          {
                            subordinateQuestionary.questionarioPonto[0] ? (
                              <button onClick={() => handleClickButton(subordinateQuestionary)}>
                                <FiCheck size={18} />
                              </button>
                            ) : (
                              <Link
                                to={`/responder-questionario/${subordinateQuestionary.id}`}
                                className='black-color'>
                                <FiEye size={18} />
                              </Link>
                            )
                          }
                        </td>
                        <td>
                          {
                            subordinateQuestionary.questionarioPonto[0] ? (
                              <button type='button' onClick={() => openModalNew()} >
                                <AiFillStar size={18} />
                              </button>
                            ) : (
                              <button onClick={() => toast.error("Avaliação não finalizada")}  >
                                <AiOutlineStar size={18} />
                              </button>
                            )
                          }
                        </td>
                      </S.TrSecond>
                    )
                  ))
              )
            }

            
          </S.Table>

       
        </S.Container>
      </S.Body>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModal}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h2>{ nome }</h2>
          {
          points[0].id ? (
            points.map(
              (point: any) => (
                <S.Question>
                <h3>
                  {
                    point.questionarioItem.nome
                  }
                </h3>

                <p>
                  {
                    point?.questionarioResposta?.resposta
                  }
                </p>

                <p>
                  nota: &nbsp;
                  {
                  point?.questionarioResposta?.resultado
                  }
                </p>
                </S.Question>
              )
            )
          ) : (
            ""
          )
          }
          
          <h2>
            {
              pontuation
            }
          </h2>

          <button type="button" onClick={() => closeModal()}>Fechar</button>
        </S.ContainerForm>
      </Modal>

      <Modal
        isOpen={modalIsOpenNew}
        onRequestClose={closeModalNew}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalNew}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h2>Serviço ainda não feito</h2>
          <button type="button" onClick={() => closeModalNew()}>Fechar</button>
          
        </S.ContainerForm>
      </Modal>

      
    </>
  )
}