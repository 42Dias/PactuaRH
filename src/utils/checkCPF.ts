import { toast } from 'react-toastify'
export async function checkCPF(strCPF: string) {
  let sum
  let rest

  sum = 0
  if (
    strCPF == '00000000000' ||
    strCPF == '11111111111' ||
    strCPF == '22222222222' ||
    strCPF == '33333333333' ||
    strCPF == '44444444444' ||
    strCPF == '55555555555' ||
    strCPF == '66666666666' ||
    strCPF == '77777777777' ||
    strCPF == '88888888888' ||
    strCPF == '99999999999'
  ) {
    {
      return toast.error('CPF inválido!')
    }

    for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  }
  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(strCPF.substring(9, 10))) {
 { return toast.error('CPF inválido!') }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
    rest = (sum * 10) % 11

    if (rest == 10 || rest == 11) rest = 0
    if (rest != parseInt(strCPF.substring(10, 11))) return toast.error('CPF inválido!')
    return toast.success('CPF válido!')
  }
}
