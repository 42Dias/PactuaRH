import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './AnswerQuestionary.styled'
import { useEffect, useState } from 'react'
import questionarios from 'service/questionarios/questionarios'
import { fullName } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { useParams } from 'react-router-dom'
import { Radio } from 'antd';
import stateHandler from 'utils/changeStatesHandlers'
import { SubmitButton } from 'ui/components/SubmitButton'


export default function AnswerQuestionary() {

  const { id }  = useParams()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  
  const [nome, setNome] = useState<string>('')
  const [selectedId, setSelectedId] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [answerQuestionary, setAnswerQuestionary] = useState<any>({})
  const [respostas, setRespostas] = useState<any>({})

  
  async function handleLoadAnswerQuestionary() {
    const allAnswerQuestionary = await questionarios.find(id)

    let perguntasERespostas: any = []


    //maps the questions adding all the basic data to a array of objects
    allAnswerQuestionary?.perguntas.map(
      (pergunta: any) => {
        const data = {
          perguntaId: pergunta.id,
          respostaId: '',
          pontuacao: 0
        }

        perguntasERespostas.push(data)

      })
    
    setRespostas(perguntasERespostas)



    setAnswerQuestionary(allAnswerQuestionary)
  }



  useEffect(() => {
    handleLoadAnswerQuestionary()
  }, [])


  function handleSetAnwser(value: string, id: string, index: number){
    let awnsers = [...respostas]

    awnsers[index].pontuacao  = parseFloat(value)
    awnsers[index].respostaId = id

    setRespostas(awnsers)

  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function checkQuestionaryAvaliation(){
    let sumOfAnwsers = 0

    respostas.map(
      (item: any) => sumOfAnwsers += item.pontuacao 
    )

    let items = answerQuestionary.questionarioScore[0].item

    console.log("sumOfAnwsers")
    console.log(sumOfAnwsers)

    let how = ""

    items.map(
      (item: any) => {
        if (item.pontuacao < sumOfAnwsers){
          how = item.nome
        }
      }
    )


    return how
    

  }



  
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
              {pergunta.descricao}
              <br />
              {pergunta.id}
            </p>

            <S.Alternative>
            {
              pergunta?.questionarioResposta.map(
                (resposta: any) => (
                  <div>
                  {resposta.id}
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
                  <label htmlFor="1">{resposta.resposta} | { resposta.resultado }.</label>
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
            // handleUpdate(id)
          }}
        >
          <h2>Editar benefício</h2>
            <p>

            Sua pontuação foi: {checkQuestionaryAvaliation()}


            </p>
          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>



        </S.Container>
      </S.Body>
    </>
  )
}
