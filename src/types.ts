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
  avaliacaoScore: any
  nome: string
  pergunta: string
  tipoDeResposta: string
  obrigatorio: boolean
  tipo: string
  
  de:   number | undefined,
  ate:  number | undefined,
  
  pontos: iQuestoes[]
  questionarioScore: iQuestoes[],
  item: iQuestoes
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
