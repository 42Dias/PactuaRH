import { FiEdit, FiEdit2, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './Evaluation.styled'
import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { iQuestoes, PropsModal } from 'types'
import questionarios from 'service/questionarios/'
import questionariosScoreItem from 'service/questionariosScoreItem/questionariosScoreItem'
import InputComponent from 'ui/components/InputComponent'
import CheckBox from 'ui/components/CheckBox' 
import { toast } from 'react-toastify'
import questionariosScores from 'service/questionariosScore/questionariosScore'
import LoadingLayer from 'ui/components/LoadingLayer'
import Status from 'ui/components/Status'
import avaliacoes from 'service/avaliacoes'

export function Evaluation() {

/*
==========================================================================================================
                                        STATES
==========================================================================================================
*/ 

  const avaliationId  = useParams().id;
  
  //ModalStates
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveTabKey] = useState<number>(0);

  //PageComponents States
  const [avaliacaoScoreKind, setavaliacaoScoreKind] = useState<iQuestoes[] | any>([])

  const [questionario     , setQuestionario     ] = useState<iQuestoes[] | any>([])
  const [selectedScore    , setSelectedScore    ] = useState<iQuestoes[] | any>([])
  const [selectedScoreItem, setSelectedScoreItem] = useState<iQuestoes[] | any>([])
  
  const [id             , setId             ] = useState<string | undefined>("")
  const [nome           , setNome           ] = useState<string | undefined>('')

  const [subItens        , setSubItens      ] = useState<any[] | undefined>()


  const [score         , setScore  ] = useState<string>("")
  const [titulo        , setTitulo ] = useState<string>("")
  const [de            , setDe     ] = useState<string | number>("")
  const [ate           , setAte    ] = useState<string | number>("")
  const [idScore       , setIdScore] = useState<string>("")




  //Avaliation States
  const [formato, setFormato] = useState<string>('')
  const [tipo,    setTipo   ] = useState<string>('')

  const [loading, setLoading] = useState(true);



/*
==========================================================================================================
                                        Modal Functions
==========================================================================================================
*/

	const openModal = (activeKey:any) => {
		if (activeKey === 1) {
      setActiveTabKey(activeKey)
			setIsOpen(true);
		}
    
    else if(activeKey === 2) {
      setActiveTabKey(activeKey)
      setIsOpen(true);
    }
    
    else if (activeKey === 3) {
      setActiveTabKey(activeKey)
      setIsOpen(true);
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


  function handleOpenEditModal(id: string, nome: string, score: iQuestoes){
    setId(id)
    setNome(nome)


    setSelectedScore(score)
    console.log(score)

    //@ts-ignore
    setFormato(score?.formato!)
        
    openModal(3)
  }


  function handleOpenSettingsModal(id: string, score?: any, nome?: string){

    setId(id)
    setSelectedScore(score?.id)
    setSubItens(score?.item.sort((previous: any,next: any) => (previous.de > next.de) ? 1 : ((next.de > previous.de) ? -1 : 0)))         
    setFormato(score?.formato)
    setTipo(score?.tipo)

    setNome(nome)

    openModal(2)
  }




/*
==========================================================================================================
                                          CRUD FUNCTIONS 
==========================================================================================================
*/


function handleClearValuesAndOpenCreateScore(){
  setTitulo("")
  setDe("")
  setAte("")

  openModal(4)
}



  
function handleSetValuesAndOpenEditScore(id: string, to: string | number, from: string | number , titleAvaliation: string){
  setSelectedScoreItem(id)
  setDe(to!)
  setAte(from!)
  setTitulo(titleAvaliation!)

  openModal(5)
}


  //necessary by the single page's modal
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    switch (activeKey) {
      case 1:
        handleCreate()
        break;
      case 2:
        updateSecondary()
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
    const allQuestionario = await questionarios.listWithFilter("avaliacaoId", avaliationId)    
    setQuestionario(allQuestionario)

    setLoading(false)
  }

  async function handleFindAvaliacao() {
    const avaliacao = await avaliacoes.find(avaliationId)    

    console.log(avaliacao)

    console.log(avaliacao.avaliacaoScore[0].forma)
    setavaliacaoScoreKind(avaliacao.avaliacaoScore[0].forma)

    setLoading(false)
  }

  async function handleGetAndSetSettingsModal(id: string){
    const selectedQuestionario = await questionarios.find(id)
    
    console.log("selectedQuestionario")
    console.log(selectedQuestionario)
    handleOpenSettingsModal(selectedQuestionario.id, selectedQuestionario.questionarioScore[0], selectedQuestionario.nome)

    // setActiveTabKey(2)

  }

  async function handleCreate() {
    const scaffoldScoreItems = [
      {
        nome: "Acima do esperado",
        pontuacao: 0,
        descricao: 0,
        de: 5,
        ate: 10,
      },
      {
        nome: "Estático",
        pontuacao: 0,
        descricao: 0,
        de: 3,
        ate: 4,
      },
      {
        nome: "Abaixo do esperado",
        pontuacao: 0,
        descricao: 0,
        de: 0,
        ate: 2,
      }
    ]
    
    const data = {
      nome: nome,
      scoreItem: scaffoldScoreItems,
      formato: formato,
      avaliacaoId: avaliationId
    }

    const isCreated = await questionarios.create(data)

    // const isCreatedScore = await questionariosScores.create(data)


    if (isCreated) handleGetAndSetSettingsModal(isCreated.id)
    await handleLoadQuestionario()
  }

  async function handleUpdate() {

    const data = {
      nome: nome,
      avaliacaoId: avaliationId,
    }

    const scoreData = selectedScore;

    scoreData.formato = formato

    const isUpdated = await questionarios.update(id, data)

    const isUpdatedScore = await questionariosScores.update(scoreData.id, scoreData)

    if (isUpdated && isUpdatedScore) handleGetAndSetSettingsModal(isUpdated.id)

    await handleLoadQuestionario()
  }
 
  async function handleDelete(id: string) {
    await questionarios.delete(id)

    handleLoadQuestionario()
  }


  //it is autautomatically created in backend in the avaliation creation  
  // So it is just necessary to updated it's values
  async function updateSecondary() {

    const data = {
      de: de, 
      ate: ate,
      nome: nome,
      score: score,
      formato: formato,
      tipo: tipo,
      
      questionariosrioScoreId: selectedScore,
      questionariosScore: selectedScore,
    }

    const isUpdated = await questionariosScores.update(selectedScore, data)

    // if (isUpdated) closeModal()

    if (isUpdated) handleGetAndSetSettingsModal(id!)

    await handleLoadQuestionario()
  }
 

  

  async function handleCreateSubItem(){
    let data = {
      de: de, 
      ate: ate,
      nome: titulo,
      score: score,
      questionariosrioScoreId: selectedScore,
    }

    const isCreated = await questionariosScoreItem.create(data)
    if (isCreated) closeModal()

    await handleLoadQuestionario()
  }

  async function handleEditSubItem(){

    let data = {
      de:  Number(de), 
      ate: Number(ate),
      nome: titulo,
      score: score,
      questionariosrioScoreId: selectedScore,
      questionariosScore: selectedScore,
    }

    const isCreated = await questionariosScoreItem.update(selectedScoreItem, data)


    if (isCreated) handleGetAndSetSettingsModal(id!)

    await handleLoadQuestionario()
  }
  

  async function handleDeleteSubItem(id: string) {
    await questionariosScoreItem.delete(id)
    handleGetAndSetSettingsModal(id!)

    handleLoadQuestionario()
  }
  

  /*
  ==========================================================================================================
                                  Page's SubComponents 
  ==========================================================================================================
  */

  function TitleComponent({ title }: PropsModal) {
    return <h1>{title}</h1>
  }

  
  

  function ScoreComponent({titleAvaliation, from, to, id, }: PropsModal) {
    return (
      <div>
        <div className="gridScore addBox">
          <span>{titleAvaliation}</span>
          <span>{from} {tipo === "porcentagem" && "%"} </span>
          <span>{to  } {tipo === "porcentagem" && "%"} </span>
          <div>
            {/* <button onClick={() => handleDeleteSubItem(id!)}>
              <FiTrash2 />
            </button> */}
            <button onClick={() => handleSetValuesAndOpenEditScore(id! ,from! ,to! ,titleAvaliation!)   
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

    handleFindAvaliacao()
  }, [])




  return (
    <>
      <S.Body>
        <Sidebar />
        <LoadingLayer loading={loading} />

        <S.Title>
          <S.Container>
            <S.LinksScore>
              <div>
                <Status active={true} />
                <small>Avaliação</small>
              </div>

              <div>
                <Status active={true} />
                <small>Iniciativa ou KPI</small>
              </div>
          
            </S.LinksScore>
          </S.Container>
        </S.Title>

        <S.Container>
          <S.LinksContainer>
            <Link 
            to='/cadastro-de-avaliacao'
            >
              Avaliação &gt;
            </Link>
            <p 
            className='active-class' 
            // to='/avaliacao'
            >
              Iniciativa ou KPI &gt;
            </p>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>
            Iniciativa ou KPI
            </h2>

            <button onClick={() => handleOpenCreateModal()}>
              <FiPlus /> Novo
            </button>
          </S.FlexInit>
          
          {
          questionario.map(
           ( questioryItem: iQuestoes ) => (

            <div className='box-avaliacoes' key={questioryItem.id}>
              {/* <Link to={`/perguntas/${questioryItem.id}`}>{questioryItem.nome}</Link> */}
              <p>{questioryItem.nome}</p>
              <div className='flex-configs'>
                {/*
                <button onClick={() => handleOpenSettingsModal(questioryItem.id, questioryItem?.questionarioScore[0], questioryItem.nome)} className='settings'>
                  <FiSettings />
                  <span>Configurar</span>
                </button>
                */}
                <button className='delete' onClick={() => handleDelete(questioryItem.id)}>
                  <FiTrash2 />
                </button>
                <button onClick={() => handleOpenEditModal(questioryItem.id, questioryItem.nome, questioryItem.questionarioScore[0])} className='edit'>
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

              <ConfigCheckTitle titleConfig='Avaliação' />
              <div className="checkContainer">
                
                <CheckBox value="numerico"     checkBoxTitle='KPI / Númerico'     onChange={() => setFormato("numerico")}    checked={formato === "numerico"}      />
                
                {
                avaliacaoScoreKind == "questionarioDesempenho" && <CheckBox value="naoNumerico"  checkBoxTitle='Iniciativa / Não númerico' onChange={() => setFormato("naoNumerico")} checked={formato === "naoNumerico" }  />
                }
              </div>

            </>
					)}

          {activeKey === 2 && (
						<div className='confgContainer'>
              <TitleComponent title='Configurar' />

              <ConfigCheckTitle titleConfig='Tipo de pontuação' />
              <div className="checkContainer">
                <CheckBox value="porcentagem" checkBoxTitle='Porcentagem' onChange={() => setTipo("porcentagem")}  checked={tipo === "porcentagem" } />
                <CheckBox value="quantidade"  checkBoxTitle='Pontos'      onChange={() => setTipo("quantidade")}   checked={tipo === "quantidade" }  />
              </div>

              <div className="flexBtn">
                <h2>Score</h2>

                {/* <button onClick={() => handleClearValuesAndOpenCreateScore()}><FiPlus /> Novo</button> */}
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

              <ConfigCheckTitle titleConfig='Avaliação' />
              <div className="checkContainer">
                <CheckBox value="numerico"     checkBoxTitle='KPI / Númerico'     onChange={() => setFormato("numerico")}    checked={formato === "numerico"}      />
                <CheckBox value="naoNumerico"  checkBoxTitle='Iniciativa / Não númerico' onChange={() => setFormato("naoNumerico")} checked={formato === "naoNumerico" }  />
              </div>

            </>
          )}

          {activeKey === 4 && (
            <>
              <TitleComponent title='Adicionar score' onChange={(text: any) => setScore(text)}  value={score} />
              <InputComponent title='Titulo'          onChange={(text: any) => setTitulo(text)} value={titulo}    />
              <InputComponent title='De'          onChange={(text: any) => setDe(text)}     value={de}        />
              <InputComponent title='Até'         onChange={(text: any) => setAte(text)}    value={ate}       />
            </>
          )}

          {activeKey === 5 && (
            <>
              <TitleComponent title='Editar score' onChange={(text: any) => setScore(text)}  value={score} />
              <InputComponent title='Titulo'       onChange={(text: any) => setTitulo(text)} value={titulo}    />
              <InputComponent title='De'       onChange={(text: any) => setDe(text)}     value={de}        />
              <InputComponent title='Até'      onChange={(text: any) => setAte(text)}    value={ate}       />
            </>
          )}

          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
