import { createContext, useState, useEffect, useContext } from "react";
import questionariosScores from "service/avaliacaoScore/avaliacaoScore";
import avaliacaoScoreItem from "service/avaliacaoScoreItem/avaliacaoScoreItem";

import questionarioRespository from '../service/avaliacoes'

import { iQuestoes, ReactProps } from '../types'

export const EvaluationRecordContext = createContext({})

export default function EvaluationRecordProvider({ children }: ReactProps) {
  
  async function loadQuestionario() {
    const allQuestionario = await questionarioRespository.list()
    setQuestionario(allQuestionario)

    return allQuestionario
  }


  async function findQuestionario(id: string) {
    const selectedQuestionario = await questionarioRespository.find(id)

    return selectedQuestionario
  }

  async function createQuestionario(data: any) {
    const isCreated = await questionarioRespository.create(data)
    if (isCreated) await loadQuestionario()

    console.log("data")
    console.log(data)

    const dataScore = {
      nome: data.nome,
      avaliacaoId: isCreated.id,
      items: data.scoreItem, 
      forma: data.forma,
    }


    const createdQuestionarioScore = await questionariosScores.create(dataScore)

    console.log("createdQuestionarioScore")
    console.log(createdQuestionarioScore)
    
    return isCreated
  }

  async function updateQuestionario(id: string, data: iQuestoes) {


    const isUpdated = await questionarioRespository.update(id, data)
    
    const isUpdatedScore = await updateQuestionarioScore(data.id,  data)
    
    if (isUpdated && isUpdatedScore)
      await loadQuestionario()

    return isUpdated
  }

  async function deleteQuestionario(id: string) {
    await questionarioRespository.delete(id)
    loadQuestionario()
  }


  async function createQuestionarioScore(data: iQuestoes) {
    const isCreated = await questionariosScores.create(data)
    if (isCreated) await loadQuestionario()
    
    return isCreated
  }

  async function updateQuestionarioScore(id: string, data: iQuestoes) {

    const isUpdated = await questionariosScores.update(id, data)
    if (isUpdated)
      await loadQuestionario()

    return isUpdated
  }

  async function deleteQuestionarioScore(id: string) {
    await questionariosScores.delete(id)
    loadQuestionario()
  }




  async function createQuestionarioScoreItem(data: iQuestoes) {
    const isCreated = await avaliacaoScoreItem.create(data)
    if (isCreated) await loadQuestionario()
    
    return isCreated
  }

  async function updateQuestionarioScoreItem(id: string, rawData: iQuestoes) {
    const data = {
      nome: rawData.nome,
    }

    const isUpdated = await avaliacaoScoreItem.update(id, data)
    if (isUpdated)
      await loadQuestionario()

    return isUpdated
  }

  async function deleteQuestionarioScoreItem(id: string) {
    await avaliacaoScoreItem.delete(id)
    loadQuestionario()
  }



  const [questionario, setQuestionario] = useState<iQuestoes[] | any>()


  useEffect(() => {
    loadQuestionario();
  }, []);


  return (
    <EvaluationRecordContext.Provider
      value={{
        questionario,
        setQuestionario,
        loadQuestionario,
        createQuestionario,
        findQuestionario,
        updateQuestionario,
        deleteQuestionario,
        createQuestionarioScore,
        updateQuestionarioScore,
        deleteQuestionarioScore,
        
      }}
    >
      {children}
    </EvaluationRecordContext.Provider>
  );
}

export function useEvaluationRecord() {
  const context = useContext(EvaluationRecordContext);

  const {
    questionario,
    setQuestionario,
    loadQuestionario,
    createQuestionario,
    findQuestionario,
    updateQuestionario,
    deleteQuestionario,
    createQuestionarioScore,
    updateQuestionarioScore,
    deleteQuestionarioScore,
    createQuestionarioScoreItem,
    updateQuestionarioScoreItem,
    deleteQuestionarioScoreItem,
  }: any = context;

  return {
    questionario,
    setQuestionario,
    loadQuestionario,
    createQuestionario,
    findQuestionario,
    updateQuestionario,
    deleteQuestionario,
    createQuestionarioScore,
    updateQuestionarioScore,
    deleteQuestionarioScore,
    createQuestionarioScoreItem,
    updateQuestionarioScoreItem,
    deleteQuestionarioScoreItem,
  };
}
