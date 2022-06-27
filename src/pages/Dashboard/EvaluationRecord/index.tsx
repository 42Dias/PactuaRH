import { FiEdit, FiEdit2, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './EvaluationRecord.styled'
import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { iQuestoes, PropsModal } from 'types'
import avaliacao from 'service/avaliacoes/avaliacoes'
import avaliacaoScoreItem from 'service/avaliacaoScoreItem/avaliacaoScoreItem'
import InputComponent from 'ui/components/InputComponent'
import CheckBox from 'ui/components/CheckBox' 
import { toast } from 'react-toastify'

export function EvaluationRecord() {

/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/
  //ModalStates
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveTabKey] = useState<number>(0);

  //PageComponents States
  const [questionario     , setQuestionario     ] = useState<iQuestoes[] | any>([])
  const [selectedScore    , setSelectedScore    ] = useState<iQuestoes[] | any>([])
  const [selectedScoreItem, setSelectedScoreItem] = useState<iQuestoes[] | any>([])
  
  const [id             , setId             ] = useState<string | undefined>("")
  const [nome           , setNome           ] = useState<string | undefined>('')

  const [subItens        , setSubItens      ] = useState<any[] | undefined>()


  const [score         , setScore  ] = useState<string>("")
  const [titulo        , setTitulo ] = useState<string>("")
  const [de            , setDe     ] = useState<string>("")
  const [ate           , setAte    ] = useState<string>("")
  const [idScore       , setIdScore] = useState<string>("")




  //Avaliation States
  const [formato, setFormato] = useState<string>('')
  const [tipo,    setTipo   ] = useState<string>('')


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


  function handleOpenSettingsModal(id: string, score?: any){

    setId(id)
    setSelectedScore(score?.id)
    setSubItens(score?.item)      
    setFormato(score?.formato)
    setTipo(score?.tipo)

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
    
    switch (activeKey) {
      case 1:
        handleCreate()
        break;
      case 2:
        // CreateSecondary()
        break;
      case 3:
        handleUpdate()
        break;
      case 4:
        handleCreateSubItem()
      break;
      case 5:
        handleEditSubItem()
      break;
      default:
        toast.error(`nada configurado para activeKey == ${activeKey}.`);
    }
    
  }

  async function handleLoadQuestionario() {
    const allQuestionario = await avaliacao.list()

    setQuestionario(allQuestionario)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
    }

    const isCreated = await avaliacao.create(data)

    if (isCreated) closeModal()
    await handleLoadQuestionario()
  }

  async function handleUpdate() {

    const data = {
      nome: nome,
    }

    const isUpdated = await avaliacao.update(id, data)

    if (isUpdated) closeModal()

    await handleLoadQuestionario()
  }
 
  async function handleDelete(id: string) {
    await avaliacao.delete(id)

    handleLoadQuestionario()
  }

  async function handleCreateSubItem(){
    let data = {
      de: de, 
      ate: ate,
      nome: titulo,
      score: score,
      avaliacaorioScoreId: selectedScore,
    }

    const isCreated = await avaliacaoScoreItem.create(data)
    if (isCreated) closeModal()

    await handleLoadQuestionario()
  }

  async function handleEditSubItem(){

    let data = {
      de: de, 
      ate: ate,
      nome: titulo,
      score: score,
      avaliacaorioScoreId: selectedScore,
      avaliacaoScore: selectedScore,
    }

    const isCreated = await avaliacaoScoreItem.update(data)
    if (isCreated) closeModal()

    await handleLoadQuestionario()
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

  
  

  function ScoreComponent({titleAvaliation, from, to, id}: PropsModal) {
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
            <button onClick={() => {
              setSelectedScoreItem(id)
              openModal(5)
              }
            }>
              <FiEdit />
            </button>
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
    handleLoadQuestionario()
  }, [])

  console.log(questionario)




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
              <Link to={`/avaliacao/${questioryItem.id}`}>{questioryItem.nome}</Link>
              <div className='flex-configs'>
                  <button onClick={() => handleOpenSettingsModal(questioryItem.id, questioryItem?.avaliacaoScore[0])} className='settings'>
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
                <CheckBox value="numerico"     checkBoxTitle='Númerico'     onChange={() => setFormato("numerico")}    checked={formato === "numerico"}      />
                <CheckBox value="naoNumerico"  checkBoxTitle='Não númerico' onChange={() => setFormato("naoNumerico")} checked={formato === "naoNumerico" }  />
              </div>

              <ConfigCheckTitle titleConfig='Tipo de pontuação' />
              <div className="checkContainer">
                <CheckBox value="porcentagem" checkBoxTitle='Porcentagem' onChange={() => setTipo("porcentagem")}  checked={tipo === "porcentagem" } />
                <CheckBox value="quantidade"  checkBoxTitle='Pontos'      onChange={() => setTipo("quantidade")}   checked={tipo === "quantidade" }  />
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

              {
              subItens?.map(
                (item, i: number) => (
                  <div
                  onClick={() => setIdScore(item.id)}
                  >
                    <ScoreComponent
                      id={item.id}
                      titleAvaliation={item.nome}
                      from={item.de}
                      to={item.ate}
                    />
                  </div>
                )
              )
              }
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
              <TitleComponent title='Adicionar score' onChange={(text: any) => setScore(text)}  value={score} />
              <InputComponent title='Titulo'          onChange={(text: any) => setTitulo(text)} value={titulo}    />
              <InputComponent title='De *%*'          onChange={(text: any) => setDe(text)}     value={de}        />
              <InputComponent title='Até *%*'         onChange={(text: any) => setAte(text)}    value={ate}       />
            </>
          )}

          {activeKey === 5 && (
            <>
              <TitleComponent title='Editar score' onChange={(text: any) => setScore(text)}  value={score} />
              <InputComponent title='Titulo'       onChange={(text: any) => setTitulo(text)} value={titulo}    />
              <InputComponent title='De *%*'       onChange={(text: any) => setDe(text)}     value={de}        />
              <InputComponent title='Até *%*'      onChange={(text: any) => setAte(text)}    value={ate}       />
            </>
          )}

          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
