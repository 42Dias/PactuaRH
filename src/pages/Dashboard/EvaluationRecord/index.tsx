import { FiCheck, FiEdit, FiEdit2, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './EvaluationRecord.styled'
import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { iQuestoes, PropsModal } from 'types'
import questionario from 'service/avaliacoes'
import avaliacaoScoreItem from 'service/avaliacaoScoreItem/avaliacaoScoreItem'
import InputComponent from 'ui/components/InputComponent'
import CheckBox from 'ui/components/CheckBox'
import { toast } from 'react-toastify'
import questionarioScores from 'service/questionariosScore/questionariosScore'
import LoadingLayer from 'ui/components/LoadingLayer'
import Status from 'ui/components/Status'
import { useEvaluationRecord } from 'contexts/EvaluationRecordProvider'
import avaliacaoScores from 'service/avaliacaoScore/avaliacaoScore'
import InfoHover from 'ui/components/HoverInfo'
import { TrTitle } from '../UserRegistration/UserRegistration.styled'

export function EvaluationRecord() {
  const {
    questionario,
    setQuestionario,
    loadQuestionario,
    createQuestionario,
    findQuestionario,
    updateQuestionario,
    deleteQuestionario
  } = useEvaluationRecord()




  /*
  ==========================================================================================================
                                          STATES
  ==========================================================================================================
  */

  //===================================== Modal's States
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveTabKey] = useState<number>(0);

  //===================================== PageComponents's States
  const [questionarioList , setQuestionarioList     ] = useState<iQuestoes[] | any>([])
  const [selectedScore    , setSelectedScore    ] = useState<iQuestoes[] | any>([])
  const [selectedScoreItem, setSelectedScoreItem] = useState<iQuestoes[] | any>([])
  const [id             , setId             ] = useState<string | undefined>("")
  const [nome           , setNome           ] = useState<string | undefined>('')
  const [subItens        , setSubItens      ] = useState<any[] | undefined>()
  const [score         , setScore  ] = useState<any>("")
  const [titulo        , setTitulo ] = useState<string>("")
  const [de            , setDe     ] = useState<string | number>("")
  const [ate           , setAte    ] = useState<string | number>("")
  const [idScore       , setIdScore] = useState<string>("")



  //Avaliation States
  const [formato, setFormato] = useState<string | any>('')
  const [tipo, setTipo] = useState<string>('')
  const [forma, setForma] = useState<string>('')

  //Loading State
  const [loading, setLoading] = useState(true);


  /*
  ==========================================================================================================
                                          Modal Functions
  ==========================================================================================================
  */

  const openModal = (activeKey: any) => {
    if (activeKey === 1) {
      setActiveTabKey(activeKey)
      setIsOpen(true);
    }

    else if (activeKey === 2) {
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


  function handleOpenCreateModal() {
    openModal(1)
    //Clean the id
    setId("")
    setNome("")

  }


  function handleOpenEditModal(id: string, nome: string, score: iQuestoes) {
    setId(id)
    setNome(nome)

    setSelectedScore(score)
    console.log(score)
    setForma(score?.forma!)

    openModal(3)
  }


  function handleOpenSettingsModal(id: string, score?: any, nome?: string) {

    console.log(id, score, nome)

    setId(id)
    setSelectedScore(score?.id)
    setSubItens(score?.item.sort((previous: any, next: any) => (previous.de > next.de) ? 1 : ((next.de > previous.de) ? -1 : 0)))
    setFormato(score?.formato)
    setForma(score?.forma)
    setTipo(score?.tipo)

    setTitulo(nome!)

    openModal(2)
  }




  /*
  ==========================================================================================================
                                            CRUD FUNCTIONS 
                                          CRUD FUNCTIONS 
                                            CRUD FUNCTIONS 
                                          CRUD FUNCTIONS 
                                            CRUD FUNCTIONS 
  ==========================================================================================================
  */

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
    const allQuestions = await loadQuestionario()
    setQuestionarioList(allQuestions)

    setLoading(false)
  }

  async function handleGetAndSetSettingsModal(id: string) {
    const selectedQuestionario = await findQuestionario(id)

    console.log("selectedQuestionario")
    console.log(selectedQuestionario)
    handleOpenSettingsModal(selectedQuestionario.id, selectedQuestionario.avaliacaoScore[0], selectedQuestionario.nome)

    // setActiveTabKey(2)

  }

  async function handleCreate() {
    const scaffoldScoreItems = [
      {
        nome: "Acima do esperado",
        pontuacao: 0,
        descricao: 0,
        ordem: 2,
        de: 75,
        ate: 100,
      },
      {
        nome: "S??lido",
        pontuacao: 0,
        descricao: 0,
        ordem: 1,
        de: 25,
        ate: 75,
      },
      {
        nome: "Abaixo do esperado",
        pontuacao: 0,
        descricao: 0,
        ordem: 0,
        de: 0,
        ate: 25,
      }
    ]

    const data = {
      nome: nome,
      scoreItem: scaffoldScoreItems,
      forma: forma,
      tipo: "porcentagem",
    }


    const isCreated = await createQuestionario(data)

    if (isCreated) handleGetAndSetSettingsModal(isCreated.id)

    await handleLoadQuestionario()
  }

  async function handleUpdate() {
    const data = selectedScore

    data.nome = nome
    data.forma = forma


    const isUpdated = await updateQuestionario(id, data)
    if (isUpdated) handleGetAndSetSettingsModal(isUpdated.id)
    // closeModal()


    await handleLoadQuestionario()
  }

  async function handleDelete(id: string) {
    await deleteQuestionario(id)

    // handleGetAndSetSettingsModal(id!)

    handleLoadQuestionario()
  }


  // it is automatically created in backend in the avaliation creation  
  // So it is just necessary to updated it's values
  async function updateSecondary() {

    const data = {
      de: de,
      ate: ate,
      nome: nome,
      score: score,
      formato: formato,
      tipo: tipo,

      questionariorioScoreId: selectedScore,
      questionarioScore: selectedScore,
    }

    const isUpdated = await avaliacaoScores.update(selectedScore, data)

    // if (isUpdated)
    // closeModal()

    await handleLoadQuestionario()
  }




  async function handleCreateSubItem() {
    let data = {
      de: de,
      ate: ate,
      nome: titulo,
      score: score,
      questionariorioScoreId: selectedScore,
    }

    const isCreated = await avaliacaoScoreItem.create(data)
    if (isCreated) closeModal()

    await handleLoadQuestionario()
  }

  async function handleEditSubItem() {

    let data = {
      de: Number(de),
      ate: Number(ate),
      nome: titulo,
      score: score,
      questionariorioScoreId: selectedScore,
      questionarioScore: selectedScore,
    }

    const isCreated = await avaliacaoScoreItem.update(selectedScoreItem, data)

    if (isCreated) handleGetAndSetSettingsModal(id!)

    await handleLoadQuestionario()
  }


  async function handleDeleteSubItem(id: string) {
    await avaliacaoScoreItem.delete(id)
    closeModal()

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




  function ScoreComponent({ titleAvaliation, from, to, id }: PropsModal) {
    return (
      <div>
        <div className="gridScore addBox">
          <span>{titleAvaliation}</span>
          <span>{from}{tipo === "porcentagem" && "%"}</span>
          <span>{to}{tipo === "porcentagem" && "%"}</span>
          <div>
            {/* <button onClick={() => handleDeleteSubItem(id!)}>
              <FiTrash2 />
            </button> */}
            <button onClick={() => {

              setSelectedScoreItem(id)
              setDe(from!)
              setAte(to!)
              setTitulo(titleAvaliation!)

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


  function ConfigCheckTitle({ titleConfig }: PropsModal) {
    return (
      <>
        <span>{titleConfig}</span>
      </>
    )
  }



  /*
  ==========================================================================================================
                                    UseEffects 
                                  UseEffects 
                                    UseEffects 
                                  UseEffects 
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
        {/*
        <LoadingLayer loading={loading} />
        */}

        <S.Title>
          <S.Container>
            <S.LinksScore>
              <div>
                <Status active={true} />
                <small>Avalia????o</small>
              </div>

              <div>
                <Status />
                <small>Iniciativa ou KPI</small>
              </div>


            </S.LinksScore>
          </S.Container>
        </S.Title>

        <S.Container>
          <S.LinksContainer>
            <Link
              className='active-class'
              to='/cadastro-de-avaliacao'
            >
              Avalia????o &gt;
            </Link>
            <p
            >
              Iniciativa ou KPI &gt;
            </p>

          </S.LinksContainer>

          <S.FlexInit>
            <h2>Avalia????o</h2>

            <button onClick={() => handleOpenCreateModal()}>
              <FiPlus /> Novo
            </button>
          </S.FlexInit>

          <div>
            <Switch defaultChecked />
          </div>

          <div className='box-avaliacoes'>
            <div className="flex-name">
              <span>
                Nome
              </span>
            </div>


            <span className='flex-info flex-info--title'>
              <InfoHover
                infoContent="Caso finalizada a avia????o ter?? um check!"
              >
                Finalizada
              </InfoHover>
            </span>

            <div className='flex-configs'>
              <span>
                A????es
              </span>
            </div>
          </div>

          {
            questionario && questionario?.map(
              (questioryItem: iQuestoes) => (

                <div className='box-avaliacoes' key={questioryItem.id}>
                  <div className="flex-name">
                    <Link to={`/avaliacao/${questioryItem.id}`}>
                      {questioryItem.nome}
                    </Link>
                  </div>


                  {
                    questioryItem.isFinalizada && <div className='flex-info'>
                      <InfoHover
                        infoContent="Avalia????o Finalizada"
                      >
                        <FiCheck size={20} />
                      </InfoHover>
                    </div>
                  }

                  <div className='flex-configs'>
                    {/*
                    Instead of click in other button, the modal have steps 

                    <button onClick={() => handleOpenSettingsModal(questioryItem.id, questioryItem?.avaliacaoScore[0], questioryItem.id)} className='settings'>
                      <FiSettings />
                      <span>Configurar</span>
                    </button>
                    */}

                    <button className='delete' onClick={() => handleDelete(questioryItem.id)}>
                      <FiTrash2 />
                    </button>
                    <button onClick={() => handleOpenEditModal(questioryItem.id, questioryItem.nome, questioryItem?.avaliacaoScore[0])} className='edit'>
                      <FiEdit2 />
                    </button>
                  </div>
                </div>

              )
            )}


        </S.Container>
      </S.Body>

      {
        /*
        ==========================================================================================================
                                                     Modal 
                                             Modal 
                                                     Modal 
                                             Modal 
                                                     Modal 
        ==========================================================================================================
        */
      }
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

        {/* <EvaluationRecordModal />*/}

        <S.ContainerForm
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >

          {activeKey === 1 && (
            <>
              <TitleComponent title='Adicionar avalia????o' />
              <InputComponent title='Titulo' onChange={(text: any) => setNome(text)} value={nome} />

              <ConfigCheckTitle titleConfig='Esta Avalia????o ??' />
              <div className="checkContainer">
                <CheckBox value="PDI" checkBoxTitle='PDI' onChange={() => setForma("PDI")} checked={forma === "PDI"} />
                <CheckBox value="PMP" checkBoxTitle='PMP' onChange={() => setForma("PMP")} checked={forma === "PMP"} />
                <CheckBox value="questionarioDesempenho" checkBoxTitle='Avaliaca????o Desempenho' onChange={() => setForma("questionarioDesempenho")} checked={forma === "questionarioDesempenho"} />
              </div>

              <button className='send' type='submit'>Cadastrar</button>

            </>
          )}

          {activeKey === 2 && (

            <>
              <div className='confgContainer'>
                <TitleComponent title='Configurar' />
                {/* <ConfigCheckTitle titleConfig='Avalia????o' /> */}



              {/*
                Now the user cannot config that

                <ConfigCheckTitle titleConfig='Formato' />
                <div className="checkContainer">
                  <CheckBox value="numerico"     checkBoxTitle='N??merico'     onChange={() => setFormato("x")} checked={formato === "x"}   />
                  <CheckBox value="naoNumerico"  checkBoxTitle='N??o n??merico' onChange={() => setFormato("y")} checked={formato === "y" }  />
                </div>

                <ConfigCheckTitle titleConfig='Tipo de pontua????o' />
                <div className="checkContainer">
                  <CheckBox value="porcentagem" checkBoxTitle='Porcentagem' onChange={() => setTipo("porcentagem")}  checked={tipo === "porcentagem" } />
                  <CheckBox value="quantidade"  checkBoxTitle='Pontos'      onChange={() => setTipo("quantidade")}   checked={tipo === "quantidade" }  />
                </div>
                
              */}

                <div className="flexBtn">
                  <h2>Score</h2>
                  {/*
                  Now user cannot create a Score subItem

                  <button onClick={() => {
                    openModal(4)
                    setTitulo("")
                    setDe("")
                    setAte("")
                    }}><FiPlus /> Novo
                    </button>
                  </button>  
                    </button>
                  </button>  
                    </button>
                  */}
                </div>
                <div className="gridScore">
                  <span>Nome</span>
                  <span>De</span>
                  <span>
                    {
                      tipo === "porcentagem" ? (
                        "Maior que"
                      ) : (
                        "At??"
                      )
                    }
                  </span>
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

              <button className='send' type='submit'>Atualizar</button>
            </>


          )}

          {activeKey === 3 && (
            <>
              <TitleComponent title='Editar avalia????o ' />
              <InputComponent title='Titulo' onChange={(text: any) => setNome(text)} value={nome} />

              <ConfigCheckTitle titleConfig='Esta Avalia????o ??' />
              <div className="checkContainer">
                <CheckBox value="PDI" checkBoxTitle='PDI' onChange={() => setForma("PDI")} checked={forma === "PDI"} />
                <CheckBox value="PMP" checkBoxTitle='PMP' onChange={() => setForma("PMP")} checked={forma === "PMP"} />
                <CheckBox value="questionarioDesempenho" checkBoxTitle='Avaliaca????o Desempenho' onChange={() => setForma("questionarioDesempenho")} checked={forma === "questionarioDesempenho"} />
              </div>

              <button className='send' type='submit'>Atualizar</button>
            </>
          )}

          {activeKey === 4 && (
            <>
              <TitleComponent title='Adicionar score' onChange={(text: any) => setScore(text)} value={score} />
              <InputComponent title='Titulo' onChange={(text: any) => setTitulo(text)} value={titulo} />
              <InputComponent title='De' onChange={(text: any) => setDe(text)} value={de} />
              <InputComponent title='At??' onChange={(text: any) => setAte(text)} value={ate} />

              <button className='send' type='submit'>Cadastrar</button>
            </>
          )}

          {activeKey === 5 && (
            <>
              <TitleComponent title='Editar score' onChange={(text: any) => setScore(text)} value={score} />
              <InputComponent title='Titulo' onChange={(text: any) => setTitulo(text)} value={titulo} />
              <InputComponent title='De' onChange={(text: any) => setDe(text)} value={de} />
              <InputComponent title='At??' onChange={(text: any) => setAte(text)} value={ate} />


              <button className='send' type='submit'>Atualizar</button>
            </>
          )}

        </S.ContainerForm>
      </Modal>
    </>
  )
}
