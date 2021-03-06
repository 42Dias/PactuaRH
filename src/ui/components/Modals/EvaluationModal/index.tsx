import { FiEdit, FiEdit2, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './styled'
import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { iQuestoes, PropsModal } from 'types'
import questionarios from 'service/questionarios'
import questionariosScoreItem from 'service/questionariosScoreItem/questionariosScoreItem'
import InputComponent from 'ui/components/InputComponent'
import CheckBox from 'ui/components/CheckBox' 
import { toast } from 'react-toastify'
import questionariosScores from 'service/questionariosScore/questionariosScore'
import LoadingLayer from 'ui/components/LoadingLayer'
import Status from 'ui/components/Status'
import ConfigCheckTitle from 'ui/components/ConfigCheckTitle'
import { ScoreComponent } from 'ui/components/ScoreComponent'

export function EvaluationModal() {

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


  function handleOpenSettingsModal(id: string, score?: any, nome?: string){

    setId(id)
    setSelectedScore(score?.id)
    setSubItens(score?.item)      
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

  async function handleCreate() {
    const data = {
      nome: nome,
      avaliacaoId: avaliationId,
    }

    const isCreated = await questionarios.create(data)

    if (isCreated) closeModal()
    await handleLoadQuestionario()
  }

  async function handleUpdate() {

    const data = {
      nome: nome,
      avaliacaoId: avaliationId,
    }

    

    const isUpdated = await questionarios.update(id, data)

    if (isUpdated) closeModal()

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

    if (isUpdated) closeModal()

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
      de: de, 
      ate: ate,
      nome: titulo,
      score: score,
      questionariosrioScoreId: selectedScore,
      questionariosScore: selectedScore,
    }

    const isCreated = await questionariosScoreItem.update(selectedScoreItem, data)
    if (isCreated) closeModal()

    await handleLoadQuestionario()
  }
  

  async function handleDeleteSubItem(id: string) {
    await questionariosScoreItem.delete(id)
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
              <TitleComponent title='Adicionar avalia????o' />
              <InputComponent title='Titulo' onChange={(text :any) => setNome(text)} value={nome} />
            </>
					)}

          {activeKey === 2 && (
						<div className='confgContainer'>
              <TitleComponent title='Configurar' />

              <br />
              <br />
              <br />
              <br />

              
              <ConfigCheckTitle titleConfig='Avalia????o' />
              <div className="checkContainer">
                <CheckBox value="numerico"     checkBoxTitle='N??merico (KPI)'     onChange={() => setFormato("numerico")}    checked={formato === "numerico"}      />
                <CheckBox value="naoNumerico"  checkBoxTitle='N??o n??merico' onChange={() => setFormato("naoNumerico")} checked={formato === "naoNumerico" }  />
              </div>

              <ConfigCheckTitle titleConfig='Tipo de pontua????o' />
              <div className="checkContainer">
                <CheckBox value="porcentagem" checkBoxTitle='Porcentagem' onChange={() => setTipo("porcentagem")}  checked={tipo === "porcentagem" } />
                <CheckBox value="quantidade"  checkBoxTitle='Pontos'      onChange={() => setTipo("quantidade")}   checked={tipo === "quantidade" }  />
              </div>

              <div className="flexBtn">
                <h2>Score</h2>

                <button onClick={() => handleClearValuesAndOpenCreateScore()}><FiPlus /> Novo</button>
              </div>

              <div className="gridScore">
                <span>Nome</span>
                <span>De</span>
                <span>At??</span>
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
                      handleDeleteSubItem={handleDeleteSubItem}
                      handleSetValuesAndOpenEditScore={handleClearValuesAndOpenCreateScore}
                      kindOfAvaliation={tipo}
                    />
                  </div>
                )
              )
              }
            </div >
					)}

          {activeKey === 3 && (
            <>
              <TitleComponent title='Editar avalia????o ' />
              <InputComponent title='Titulo' onChange={(text :any) => setNome(text)} value={nome} />
            </>
          )}

          {activeKey === 4 && (
            <>
              <TitleComponent title='Adicionar score' onChange={(text: any) => setScore(text)}  value={score} />
              <InputComponent title='Titulo'          onChange={(text: any) => setTitulo(text)} value={titulo}    />
              <InputComponent title='De *%*'          onChange={(text: any) => setDe(text)}     value={de}        />
              <InputComponent title='At?? *%*'         onChange={(text: any) => setAte(text)}    value={ate}       />
            </>
          )}

          {activeKey === 5 && (
            <>
              <TitleComponent title='Editar score' onChange={(text: any) => setScore(text)}  value={score} />
              <InputComponent title='Titulo'       onChange={(text: any) => setTitulo(text)} value={titulo}    />
              <InputComponent title='De *%*'       onChange={(text: any) => setDe(text)}     value={de}        />
              <InputComponent title='At?? *%*'      onChange={(text: any) => setAte(text)}    value={ate}       />
            </>
          )}

          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
