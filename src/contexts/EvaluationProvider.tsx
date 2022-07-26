import { createContext, useState, useEffect, useContext } from "react";

import questionarioRespository from '../service/questionarios'

import { iQuestoes, ReactProps } from '../types'

export const EvaluationRecordContext = createContext({})

export default function EvaluationRecordProvider({ children }: ReactProps) {
  
  async function loadQuestionario(filter?: string) {

    console.log(filter)
    const allQuestionario = await questionarioRespository.list(filter)
    setQuestionario(allQuestionario)



    return allQuestionario
  }



  async function findQuestionario(id: string) {
    const selectedQuestionario = await questionarioRespository.find(id)

    return selectedQuestionario
  }

  async function createQuestionario(data: iQuestoes) {
    const isCreated = await questionarioRespository.create(data)
    if (isCreated) await loadQuestionario()
    
    return isCreated
  }

  async function updateQuestionario(id: string, rawData: iQuestoes) {
    const data = {
      nome: rawData.nome,
    }

    const isUpdated = await questionarioRespository.update(id, data)
    if (isUpdated)
      await loadQuestionario()

    return isUpdated
  }

  async function deleteQuestionario(id: string) {
    await questionarioRespository.delete(id)
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
      }}
    >
      {children}
    </EvaluationRecordContext.Provider>
  );
}

export function useEvaluation() {
  const context = useContext(EvaluationRecordContext);

  const {
    questionario,
    setQuestionario,
    loadQuestionario,
    createQuestionario,
    findQuestionario,
    updateQuestionario,
    deleteQuestionario
  }: any = context;

  return {
    questionario,
    setQuestionario,
    loadQuestionario,
    createQuestionario,
    findQuestionario,
    updateQuestionario,
    deleteQuestionario,
  };
}
