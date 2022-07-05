import { FiEdit, FiEdit2, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './Questions.styled'
import CheckBox from 'ui/components/CheckBox' 

import { useEffect, useState } from 'react'
import questionarioItem from 'service/questionarioItem/questionarioItem'


import { Switch } from 'antd'
import Modal from 'react-modal'
import questionariosResposta from 'service/questionarioResposta/questionarioResposta'
import { toast } from 'react-toastify'
import InputComponent from 'ui/components/InputComponent'
import { iQuestoes, PropsModal } from 'types'
import TextAreaComponent from 'ui/components/TextAreaComponent'
import questionariosScores from 'service/questionariosScore/questionariosScore'


export function   Questions() {
/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/
  //questionaryId
  const id = useParams().id 

  
  const [modalIsOpen, setIsOpen] = useState(false)
  const [activeKey, setActiveTabKey] = useState<number>(0);

  const [nome      , setNome     ] = useState<string>('')
  const [peso      , setPeso     ] = useState<string>('')
  const [descricao ,setDescricao ] = useState<string>('')
  const [selectedId,setSelectedId] = useState<string>('')
  const [questions ,setQuestions  ] = useState<any[]>([])



  
  
  const [questionarioItemId, setQuestionarioItemId] = useState<string>('')
  const [questionariosAnswer, setQuestionariosAnswer] = useState<any[]>([])
  const [questionarioAnswerId, setQuestionarioAnswerId] = useState<string>('')
  
  const [resposta   ,setResposta   ] = useState<string | number>('')
  const [pontuacao  ,setPontuacao   ] = useState<string | number>('')

  const [formato, setFormato] = useState<string | number>('')

  const [questionaryKindOfAvaliation, setQuestionaryKindOfAvaliation] = useState<string | undefined>('')



/*
==========================================================================================================
                                        Modal Functions
==========================================================================================================
*/
	const openModal = (activeKey:any) => {
		if (activeKey === 1) {
      setActiveTabKey(activeKey)
			setIsOpen(!modalIsOpen);
		}
    
    else if(activeKey === 2) {
      setActiveTabKey(activeKey)
      setIsOpen(!modalIsOpen);
    }
    
    else if (activeKey === 3) {
      setActiveTabKey(activeKey)
      setIsOpen(!modalIsOpen);
    }
    
    else if (activeKey === 4) {
      setActiveTabKey(activeKey)
      setIsOpen(true);
    }
    
    else if (activeKey === 5) {
      setActiveTabKey(activeKey)
      setIsOpen(true);
    }
	};

  function closeModal() {
    setIsOpen(false)
  }



/*
==========================================================================================================
                                          CRUD FUNCTIONS 
==========================================================================================================
*/

  //

  function handleClearValuesAndOpenCreate(){
    setSelectedId("")
    setNome("")
    setPeso("")

    openModal(1)
  }


  
  function handleSetValuesAndOpenEdit(id: string, nome: string, peso: string){
    setSelectedId(id)
    setNome(nome)
    setPeso(peso)

    openModal(3)
  }


  function handleSetValuesAndOpenSettings(id: string, answer: iQuestoes[] ){
    setQuestionarioItemId(id)
    setQuestionariosAnswer(answer)

    openModal(2)
  }


  function handleClearValuesAndOpenCreateAnswer(){
    setPontuacao("") 
    setResposta("")
    setFormato("")
    setQuestionarioAnswerId("")

    openModal(4)
  }


  function handleSetValuesAndOpenEditAnswer( resposta: string | number ,pontuacao: string | number, id: string, formato: string){
    
    // titleAvaliation!, to!, id!, formato!
    setPontuacao(pontuacao) 
    setResposta(resposta)
    setFormato(formato)
    console.log(formato)
    setQuestionarioAnswerId(id)

    openModal(5)
  }




  //necessary by the single page's modal
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  console.log("id")
  console.log(id)

  switch (activeKey) {
    case 1:
      handleCreate()
      break;
    case 2:
      // updateSecondary()
      break;
    case 3:
      handleUpdate()
      break;
    case 4:
      handleCreateAnswer()
    break;
    case 5:
      handleUpdateAnswer()
    break;
    default:
      toast.error(`nada configurado para activeKey == ${activeKey}.`);
  }

  }


  async function handleLoadQuestions() {
    const allQuestions = await questionarioItem.listWithFilter("questionarioId", id)
    setQuestions(allQuestions)

    
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      peso: peso,
      descricao: descricao,
      questionarioId: id,
    }
    
    const isCreated = await questionarioItem.create(data)

    if (isCreated) closeModal()
    await handleLoadQuestions()
  }

  async function handleUpdate() {

    const data = {
      nome: nome,
      peso: peso,
      descricao: descricao,
      questionarioId: id,
    }

    const isUpdated = await questionarioItem.update(selectedId, data)

    if (isUpdated) closeModal()
    await handleLoadQuestions()
  }


  async function handleDelete(selectedId: string) {
    await questionarioItem.delete(selectedId)

    handleLoadQuestions()
  }


  // subcrud functions
  async function handleCreateAnswer() {
    const data = {
      resposta: resposta,
      resultado: pontuacao,
      formato: formato,
      questionarioItemId: questionarioItemId,
      
    }

    const isCreated = await questionariosResposta.create(data)

    if (isCreated) closeModal()

    handleLoadQuestions()
    
  }

  async function handleUpdateAnswer() {
    const data = {
      resposta: resposta,
      resultado: pontuacao,
      formato: formato,
      questionarioItemId: questionarioItemId,
    }

    const isUpdated = await questionariosResposta.update(questionarioAnswerId, data)

    if (isUpdated) closeModal()
    handleLoadQuestions()
    
  }  

  async function handleDeleteAnswer(selectedId: string) {
    await questionariosResposta.delete(selectedId)

    closeModal()
    handleLoadQuestions()
  }




/*
==========================================================================================================
                                  Page's SubComponents 
==========================================================================================================
*/



  function Status() {
    const [isActiveColor, setIsActiveColor] = useState(false)

    function changeColor() {
      if (isActiveColor === false) {
        setIsActiveColor(true)
      } else {
        setIsActiveColor(false)
      }
    }

    return (
      <span
        onClick={changeColor}
        className={`${isActiveColor ? 'activeColor' : ''}`}
      />
    )
  }

  function TitleComponent({ title }: PropsModal) {
    return <h1>{title}</h1>
  }



  function ScoreComponent({titleAvaliation, to, id, formato}: PropsModal) {
    return (
      <div>
        <div className="gridScore addBox">
          <span>{titleAvaliation}</span>
          <span>{to}             </span>
          <div>
            <button onClick={() => handleDeleteAnswer(id!)}><FiTrash2 /></button>
            <button onClick={() => handleSetValuesAndOpenEditAnswer(titleAvaliation!, to!, id!, formato!)}><FiEdit /></button>
          </div>
        </div>
      </div>
    )
  }

  

  function ConfigCheckTitle({titleConfig}: PropsModal) {
    return (
      <>
        <span>{titleConfig}</span>
      </>
    )
  }

/*
==========================================================================================================
                                         UseEffects 
==========================================================================================================
*/
  useEffect(() => {
    handleLoadQuestions()
  }, [])


  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>
            <S.LinksScore>
              <div>
                <Status />
                <small>Avaliação</small>
              </div>

              <div>
                <Status />
                <small>Score</small>
              </div>

              <div>
                <Status />
                <small>Questionário</small>
              </div>

              <div>
                <Status />
                <small>Score</small>
              </div>

              <div>
                <Status />
                <small>Perguntas</small>
              </div>
            </S.LinksScore>
          </S.Container>
        </S.Title>

        <S.Container>
          <S.LinksContainer>
            <Link
            to='/cadastro-de-avaliacao'
            >
              Avaliação &gt;</Link>
            <p
            // to='/avaliacao '
            >
              Questionário &gt;</p>
            <p
            className='active-class'
            // to='/perguntas'
            >
              Perguntas &gt;</p>
            <p
            // to='/'
            >
              Resposta</p>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Perguntas do Questionário 1</h2>

            <button onClick={() => handleClearValuesAndOpenCreate()}>
              <FiPlus /> Nova pergunta
            </button>
          </S.FlexInit>


          {
          questions.map(
            ( question ) => (
                <div className='box-avaliacoes'>
                  <span> {question.nome } </span>

                  <div className='flex-configs'>
                    <button onClick={() => handleSetValuesAndOpenSettings(question.id, question.questionarioResposta)} className='settings'>
                      <FiSettings />
                      <span>Configurar</span>
                    </button>
                    <button className='delete'  onClick={() => handleDelete(question.id)}>
                      <FiTrash2 />
                    </button>
                    <button onClick={() => handleSetValuesAndOpenEdit(question.id, question.nome, question.peso)} className='edit'>
                      <FiEdit2 />
                    </button>
                  </div>
                </div>
            )
          )
          }

          {/*
          <div className='box-avaliacoes'>
            <span>...?</span>
            <div className='flex-configs'>
              <button onClick={() => openModal(2)} className='settings'>
                <FiSettings />
                <span>Configurar</span>
              </button>
              <button className='delete'>
                <FiTrash2 />
              </button>
              <button onClick={() => openModal(3)} className='edit'>
                <FiEdit2 />
              </button>
            </div>
          </div>
          */}


        </S.Container>
      </S.Body>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          type='button'
          onClick={closeModal}
          className='react-modal-close'
        >
          <FiX />
        </button>

        <S.ContainerForm
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          
          {activeKey === 1 && (
						<div className='confgContainer'>
              <div className="flexBtn">
                <h2>Perguntas</h2>

                {/* <button onClick={() => openModal(4)}><FiPlus /> Nova linha</button> */}
              </div>
              <InputComponent title='Sua pergunta...'       onChange={(text :any) => setNome(text)} value={nome} />
              <InputComponent title='Peso da pergunta *%*'  onChange={(text :any) => setPeso(text)} value={peso}/>
            </div>
					)}

          {activeKey === 2 && (
						<div className='confgContainer'>
              <TitleComponent title='Configurar' />
              <div className="flexBtn">
                <button onClick={() => handleClearValuesAndOpenCreateAnswer()}><FiPlus /> Novo</button>
              </div>

              <div className="gridScore">{questionariosAnswer?.length}
                <span>Resposta</span>
                <span>Pontuação</span>
              </div>
              {
              questionariosAnswer?.map(
                answer => (
                 <ScoreComponent titleAvaliation={answer.resposta} to={answer.resultado} id={answer.id} formato={answer.formato}/>
                )
              )}

              {/* 
              <ScoreComponent titleAvaliation='Desempenho esperado' to='600 pontos' />
              <ScoreComponent titleAvaliation='Desempenho acima da média' to='100%' /> */}
            </div >
					)}

          {activeKey === 3 && (
            <>
              <TitleComponent title='Editar avaliação ' />
              <InputComponent title='Sua pergunta...'       onChange={(text :any) => setNome(text)} value={nome} />
              <InputComponent title='Peso da pergunta *%*'  onChange={(text :any) => setPeso(text)} value={peso}/>
            </>
          )}

          {activeKey === 4 && (
            <div className='confgContainer'>
              <TitleComponent title='Adicionar Resposta' />
              <ConfigCheckTitle titleConfig='Resposta'   />
              <div className="checkContainer">
                <CheckBox checkBoxTitle='Númerico'     onChange={() => setFormato("numerico")}    checked={formato === "numerico"}   />
                <CheckBox checkBoxTitle='Não númerico' onChange={() => setFormato("naoNumerico")} checked={formato === "naoNumerico" } />
              </div>
              <InputComponent title='Pontuação' onChange={(text :any) => setPontuacao(text)} value={pontuacao} />
              <TextAreaComponent title='Titulo' onChange={(text :any) => setResposta(text)} value={resposta} />
            </div>
          )}

          {activeKey === 5 && (
            <>
            <div className='confgContainer'>
              <TitleComponent title='Adicionar Resposta' />
              <ConfigCheckTitle titleConfig='Resposta'   />
              <div className="checkContainer">
                <CheckBox checkBoxTitle='Númerico'     onChange={() => setFormato("numerico")}    checked={formato === "numerico"}   />
                <CheckBox checkBoxTitle='Não númerico' onChange={() => setFormato("naoNumerico")} checked={formato === "naoNumerico" } />
              </div>
              <InputComponent title='Pontuação' onChange={(text :any) => setPontuacao(text)} value={pontuacao} />
              <TextAreaComponent title='Titulo' onChange={(text :any) => setResposta(text)}  value={resposta} />
            </div>
            </>
          )}

          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
