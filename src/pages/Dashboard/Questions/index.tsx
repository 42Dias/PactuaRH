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

interface PropsModal {
  title?: string;
  value?: string;
  valueModal?: number;
  titleConfig?: string;
  checkBoxTitle?: string;
  titleAvaliation?: string;
  to?: string;
}

export function Questions() {
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
  
  const [resposta   ,setResposta   ] = useState<string>('')
  const [pontuacao  ,setPontuacao   ] = useState<string>('')


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
  function handleSetValuesAndOpenEdit(id: string, nome: string, peso: string){
    setNome(nome)
    setPeso(peso)
    setSelectedId(id)

    openModal(3)
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
      // handleCreateAnswer()
    break;
    case 5:
      // handleUpdateAnswer()
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


  useEffect(() => {
    handleLoadQuestions()
  }, [])

  // subcrud functions
  async function handleCreateAnswer() {
    const data = {
      resposta: resposta,
      resultado: pontuacao,
      questionarioItemId: questionarioItemId,
    }

    const isCreated = await questionariosResposta.create(data)

    if (isCreated) closeModal()
    
  }

  async function handleUpdateAnswer(selectedId: string) {
    const data = {
      resposta: resposta,
      resultado: pontuacao,
      questionarioItemId: questionarioItemId,
    }

    const isUpdated = await questionariosResposta.update(selectedId, data)

    if (isUpdated) closeModal()
    
  }  

  async function handleDeleteAnswer(selectedId: string) {
    await questionariosResposta.delete(selectedId)
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


  function TextAreaComponente({value}: PropsModal) {
    return (
      <>
        <label>{value}</label>
        <textarea placeholder={value}></textarea>
      </>
    )
  }

  function ScoreComponent({titleAvaliation, to}: PropsModal) {
    return (
      <div>
        <div className="gridScore addBox">
          <span>{titleAvaliation}</span>
          <span>{to}</span>
          <div>
            <button><FiTrash2 /></button>
            <button onClick={() => openModal(5)}><FiEdit /></button>
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
            <Link to='/cadastro-de-avaliacao'>Avaliação &gt;</Link>
            <Link to='/avaliacao'>Questionário &gt;</Link>
            <Link className='active-class' to='/perguntas'>Perguntas &gt;</Link>
            <Link to='/'>Resposta</Link>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Perguntas do Questionário 1</h2>

            <button onClick={() => openModal(1)}>
              <FiPlus /> Nova pergunta
            </button>
          </S.FlexInit>


          {
          questions.map(
            ( question ) => (
                <div className='box-avaliacoes'>
                  <span> {question.nome } </span>

                  <div className='flex-configs'>
                    <button onClick={() => openModal(2)} className='settings'>
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
                <button onClick={() => openModal(4)}><FiPlus /> Novo</button>
              </div>

              <div className="gridScore">
                <span>Resposta</span>
                <span>Pontuação</span>
              </div>

              <ScoreComponent titleAvaliation='Baixo desempenho' to='50%'           />
              <ScoreComponent titleAvaliation='Desempenho esperado' to='600 pontos' />
              <ScoreComponent titleAvaliation='Desempenho acima da média' to='100%' />
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
                <CheckBox checkBoxTitle='Númerico'     />
                <CheckBox checkBoxTitle='Não númerico' />
              </div>
              <InputComponent title='Pontuação'  />
              <TextAreaComponente title='Titulo' />
            </div>
          )}

          {activeKey === 5 && (
            <>
              <TitleComponent title='Editar Resposta' />
              <InputComponent title='Titulo'       />
              <InputComponent title='De *%*'       />
              <InputComponent title='Até *%*'      />
            </>
          )}

          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
