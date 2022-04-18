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
  ir: string
  ecolaridade: iData[]
  habilidades: iData[]
  desejaveis: iData[]
  funcoes: iData[]
  area: iData
}
