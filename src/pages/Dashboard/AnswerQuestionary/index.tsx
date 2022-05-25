import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './AnswerQuestionary.styled'
import { useEffect, useState } from 'react'
import questionarios from 'service/questionarios/questionarios'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Radio } from 'antd';
import stateHandler from 'utils/changeStatesHandlers'
import { SubmitButton } from 'ui/components/SubmitButton'
import { toast } from 'react-toastify'
import questionariosResposta from 'service/questionarioResposta/questionarioResposta'
import questionarioPonto from 'service/questionarioPonto/questionarioPonto'

export default function AnswerQuestionary() {
  
  const navigate = useNavigate()
  const { id }  = useParams()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  
  const [nome, setNome] = useState<string>('')
  const [selectedId, setSelectedId] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')


  const [answerQuestionary, setAnswerQuestionary] = useState<any>({})
  const [respostas, setRespostas] = useState<any>({})
  
  const [pontuation, setPontuation] = useState<string>('')

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

  /*
  ==========================================================================================================
                                              CRUD
  ==========================================================================================================
  */

  async function handleSetRespostas(){

    respostas.map(
      async (resposta: any) => {
          
      await questionarioPonto.create(resposta)
    }
    )

    toast.success("Resposta data com sucesso")

    navigate("/dashboard")

  }


  async function handleLoadAnswerQuestionary() {
    const allAnswerQuestionary = await questionarios.find(id)

    handleSetDefaultValues(allAnswerQuestionary)

    setAnswerQuestionary(allAnswerQuestionary)
  }

  /*
  ==========================================================================================================
                                            HANDLESETVALUES
  ==========================================================================================================
  */


  function handleSetDefaultValues(allAnswerQuestionary: any){
    let perguntasERespostas: any = []

    //maps the questions adding all the basic data to a array of objects
    allAnswerQuestionary?.perguntas?.map(
      (pergunta: any) => {
        const data = {
          questionarioId: id,
          questionarioItemId: pergunta.id,
          respostaId: '',
          pontuacao: 0
        }

        perguntasERespostas.push(data)

      })

    setRespostas(perguntasERespostas)
  }

  function handleSetAnwser(value: string, id: string, index: number){
    let awnsers = [...respostas]

    awnsers[index].pontuacao  = parseFloat(value)
    awnsers[index].questionarioRespostaId = id


    setRespostas(awnsers)
  }

  /*
  ==========================================================================================================
                                              SUM AVALIATION
  ==========================================================================================================
  */


  function checkQuestionaryAvaliation(){
    let sumOfAnwsers = 0

    respostas.map(
      (item: any) => sumOfAnwsers += item.pontuacao 
    )

    let items = answerQuestionary.questionarioScore[0].item

    //sorts the values to descending order
    items.sort((previous: any, next: any)=> next.pontuacao - previous.pontuacao )
    items.reverse()

    let pontuation = ""

    console.log(answerQuestionary.questionarioScore[0].formato)


    if(answerQuestionary.questionarioScore[0].formato == "quantidade"){
      console.log("dentro do if!")

      pontuation = handleCheckPontuationByQuantidy(items, sumOfAnwsers)
    }

    else if(answerQuestionary.questionarioScore[0].formato == "porcentagem"){
      console.log("dentro do if! porcentagem")

      const length = respostas.length

      pontuation = handleCheckPontuationByPercentage(items, sumOfAnwsers, length)
    }

    else toast.error("Algo de errado com a Avaliação")


    if(pontuation == "") pontuation = "Abaixo do ponto mínimo"

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
        console.log(item.pontuacao)
        console.log(sumOfAnwsers)
        console.log(item.nome)

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
    handleLoadAnswerQuestionary()
  }, [])





  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container
          onSubmit={e => {
            e.preventDefault()
            checkQuestionaryAvaliation()
            openModal()
          }}
        >
          <h2>
            {answerQuestionary?.nome}
          </h2>
          {
            answerQuestionary?.perguntas?.map(
              (pergunta: any, index: number) => (
                <S.Question>
                  <h3>{pergunta.nome} <span className='required'>*</span> </h3>
                  <p>
                    {pergunta.pontuation}
                    {/* {pergunta.id} */}
                  </p>

                  <S.Alternative>
                    {
                      pergunta?.questionarioResposta.map(
                        (resposta: any) => (
                          <div>
                            {/* {resposta.id} */}
                            <input
                              required
                              type="radio"
                              value={resposta.resultado}
                              name={pergunta.id}
                              id={resposta.id}
                              onChange={
                                (e) => handleSetAnwser(e.target.value, e.target.id, index)

                              }
                            />
                            <label htmlFor="1">{resposta.resposta}
                              {/* | { resposta.resultado }
                  */}
                              .
                            </label>
                          </div>
                        )
                      )
                    }
                  </S.Alternative>
                </S.Question>
              ))
          }

          <S.SubmitButton type="submit" value="Enviar" name="Enviar" >
            Enviar
          </S.SubmitButton >


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
                handleSetRespostas()
              }}
            >
              <h2>Editar benefício</h2>
              <p>

                Sua pontuação foi: {pontuation}


              </p>
              <button type='submit'>Enviar</button>
            </S.ContainerForm>
          </Modal>
        </S.Container>
      </S.Body>
    </>
  )
}
