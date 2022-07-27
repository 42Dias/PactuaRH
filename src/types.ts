import { ReactNode } from 'react';

export interface ReactProps {
  children?: ReactNode
}




export interface iDependent {
  nome: string
  cpf: string
  rg: string
  dataNasc: string
}

export interface iData {
  id: string
  nome: string
}

export interface iCargo extends iData {
  lideranca: string
  cbo: string
  descricao: string
  ir: string
  ecolaridade: iData[]
  habilidades: iData[]
  desejaveis: iData[]
  funcoes: iData[]
  area: iData
  cargosLiderados: iData[]
}

export interface iNiveis extends iData {
  nome: string
  descricao: string
  cargo: iData[]
  nivel: number
}

export interface iQuestoes extends iData {
  forma: string;
  avaliacaoScore: any;
  nome: string;
  pergunta: string;
  tipoDeResposta: string;
  obrigatorio: boolean;
  tipo: string;
  de:   number;
  ate:  number;
  isFinalizada?: boolean;
  pontos: iQuestoes[];
  questionarioScore: iQuestoes[];
  item: iQuestoes[];
  questionarioResposta?: iQuestoes[];
  questionarioPonto: iQuestoes[];
  pontuacao?: string | number;
  questionarioRespostaId?: string;
  questionarioId?: string;
  resposta?: string;
  resultado?: string | number;
  formato?:   string | number;
  avaliacaoId: string;
}



export interface iQuestoesPeguntas extends iQuestoes {

  questionarioResposta: iQuestoes[],
}



export interface PropsModal {
  title?: string;
  value?: string | number | undefined;
  valueModal?: number;
  titleConfig?: string;
  checkBoxTitle?: string;
  titleAvaliation?: string;
  id?: string;
  formato?: string;
  pontuacao?: string;
  from?: number;
  to?: number;
  onChange?: (e?: string) => string | undefined | void;
}



export interface PropsCheckBox extends PropsModal {
  checked?: boolean;
}


export interface PropsScoreComponent extends PropsModal{
  handleDeleteSubItem: (id: string) => void;
  handleSetValuesAndOpenEditScore: (id: string ,from: string | number ,to: string | number ,titleAvaliation: string) => void;
  kindOfAvaliation: string;
}
