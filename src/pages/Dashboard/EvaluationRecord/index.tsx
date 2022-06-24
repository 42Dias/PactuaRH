import { FiEdit, FiEdit2, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './EvaluationRecord.styled'
import { Switch } from 'antd'
import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { iQuestoes, PropsModal } from 'types'
import questionarios from 'service/questionarios/questionarios'
import InputComponent from 'ui/components/InputComponent'

export function EvaluationRecord() {

/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/
  //ModalStates
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveTabKey] = useState();

  //PageComponents States
  const [questionario   , setQuestionario   ] = useState<iQuestoes[]>([])
  const [id             , setId             ] = useState<string | undefined>("")
  const [nome           , setNome           ] = useState<string | undefined>('')
  const [selectedQuestao, setSelectedQuestao] = useState<iQuestoes>()



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

  //Differentiate modals

  function handleOpenCreateModal(){
    openModal(1)
    //Clean the id
    setId("")
    setNome("")

  }


  function handleOpenEditModal(id: string, nome: string){
    setId(id)
    setNome(nome)
    
    openModal(3)
  }


  function handleOpenSettingsModal(id: string){
    setId(id)

    openModal(2)
  }




/*
==========================================================================================================
                                          CRUD FUNCTIONS 
==========================================================================================================
*/

  //necessary by the single page's modal
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log("id")
    console.log(id)

    if(!id) handleCreate()
    else handleUpdate() 
  }

  async function handleLoadQuestionario() {
    const allQuestionario = await questionarios.list()

    setQuestionario(allQuestionario)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
    }

    const isCreated = await questionarios.create(data)

    if (isCreated) closeModal()
    await handleLoadQuestionario()
  }

  async function handleUpdate() {

    const data = {
      nome: nome,
    }

    const isUpdated = await questionarios.update(id, data)

    if (isUpdated) closeModal()

    await handleLoadQuestionario()
  }
 
  async function handleDelete(id: string) {
    await questionarios.delete(id)

    handleLoadQuestionario()
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

  
  

  function ScoreComponent({titleAvaliation, from, to}: PropsModal) {
    return (
      <div>
        <div className="gridScore addBox">
          <span>{titleAvaliation}</span>
          <span>{from}%</span>
          <span>{to}%</span>
          <div>
            <button>
              <FiTrash2 />
            </button>
            <button onClick={() => openModal(5)}><FiEdit /></button>
          </div>
        </div>
      </div>
    )
  }

  function CheckBox({checkBoxTitle}: PropsModal) {
    return (
      <div>
        <input type="checkbox" />
        <small>{checkBoxTitle}</small>
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
    handleLoadQuestionario()
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
            <Link className='active-class' to='/cadastro-de-avaliacao'>Avaliação &gt;</Link>
            <Link to='/avaliacao'>Questionário &gt;</Link>
            <Link to='/perguntas'>Perguntas &gt;</Link>
            <Link to='/'>Resposta</Link>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Avaliação</h2>

            <button onClick={() => handleOpenCreateModal()}>
              <FiPlus /> Novo
            </button>
          </S.FlexInit>

          <div>
            <Switch defaultChecked />
          </div>
          
          {
          questionario.map(
           ( questioryItem: iQuestoes ) => (

            <div className='box-avaliacoes' key={questioryItem.id}>
              <Link to='/avaliacao'>{questioryItem.nome}</Link>
              <div className='flex-configs'>
                <button onClick={() => handleOpenSettingsModal(questioryItem.id)} className='settings'>
                  <FiSettings />
                  <span>Configurar</span>
                </button>
                <button className='delete' onClick={() => handleDelete(questioryItem.id)}>
                  <FiTrash2 />
                </button>
                <button onClick={() => handleOpenEditModal(questioryItem.id, questioryItem.nome)} className='edit'>
                  <FiEdit2 />
                </button>
              </div>
          </div>

           )
          )}

          
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
						<>
              <TitleComponent title='Adicionar avaliação' />
              <InputComponent title='Titulo' onChange={(text :any) => setNome(text)} value={nome} />
            </>
					)}

          {activeKey === 2 && (
						<div className='confgContainer'>
              <TitleComponent title='Configurar' />
              <ConfigCheckTitle titleConfig='Avaliação' />
              <div className="checkContainer">
                <CheckBox checkBoxTitle='Númerico' />
                <CheckBox checkBoxTitle='Não númerico' />
              </div>

              <ConfigCheckTitle titleConfig='Tipo de pontuação' />
              <div className="checkContainer">
                <CheckBox checkBoxTitle='Porcentagem' />
                <CheckBox checkBoxTitle='Pontos' />
              </div>

              <div className="flexBtn">
                <h2>Score</h2>

                <button onClick={() => openModal(4)}><FiPlus /> Novo</button>
              </div>

              <div className="gridScore">
                <span>Nome</span>
                <span>De</span>
                <span>Até</span>
              </div>

              <ScoreComponent titleAvaliation='Baixo desempenho' from={20} to={50} />
              <ScoreComponent titleAvaliation='Desempenho esperado' from={50} to={70} />
              <ScoreComponent titleAvaliation='Desempenho acima da média' from={70} to={100} />
            </div >
					)}

          {activeKey === 3 && (
            <>
              <TitleComponent title='Editar avaliação ' />
              <InputComponent title='Titulo' onChange={(text :any) => setNome(text)} value={nome} />
            </>
          )}

          {activeKey === 4 && (
            <>
              <TitleComponent title='Adicionar score' />
              <InputComponent title='Titulo' />
              <InputComponent title='De *%*' />
              <InputComponent title='Até *%*' />
            </>
          )}

          {activeKey === 5 && (
            <>
              <TitleComponent title='Editar score' />
              <InputComponent title='Titulo' />
              <InputComponent title='De *%*' />
              <InputComponent title='Até *%*' />
            </>
          )}

          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}