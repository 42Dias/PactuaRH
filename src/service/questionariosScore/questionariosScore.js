import { api } from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'
export default class questionariosScores {
  static async create(data) {
    const response = await api
      .post('questionario-score', {
        data,
      })

      .catch(() => {
        servidorErrorMessage()
      })

    const mensagemOk = 'Usuário criado com sucesso!'
    const mensagemNaoOK = 'Revise seus dados :('
    responseHandler(response.status, mensagemOk, mensagemNaoOK)

    const responseData = response.data
    return responseData
  }

  //= =========================================================================================================
  static async update(id, data) {
    const response = await api
      .put(`questionario-score/${id}`, {
        data,
      })
      .catch(() => {
        servidorErrorMessage()
      })
    const mensagemOk = 'Usuário alterado com sucesso!'
    const mensagemNaoOK = 'Revise seus dados :('
    responseHandler(response.status, mensagemOk, mensagemNaoOK)
    console.log(data)
    const responseData = response.data

    return responseData
  }

  //= =========================================================================================================
  static async delete(id) {
    const response = await api
      .delete(`questionario-score/${id}`)
      .then((res) => {
        const status = res.status
        const mensagemOk = 'Usuário apagado com sucesso!'
        const mensagemNaoOK = 'Algo deu errado :('

        responseHandler(status, mensagemOk, mensagemNaoOK)
      })

      .catch(() => {
        servidorErrorMessage()
      })

    return response
  }

  //= =========================================================================================================
  static async list() {
    const response = await api.get('questionario-score').catch(() => {
      servidorErrorMessage()
    })

    const responseData = response.data.rows

    return responseData
  }

  static async listWithFilter(filter, value) {
    const response = await api
      .get(`questionario-score?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

    const responseData = response.data.rows

    return responseData
  }

  //= =========================================================================================================
  static async listWithManyFilters(filters) {
    const response = await api.get(`questionario-score?${filters}`).catch(() => {
      servidorErrorMessage()
    })

    const responseData = response.data.rows

    return responseData
  }

  //= =========================================================================================================
  static async find(id) {
    const response = await api
      .get(`questionario-score/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

    return response.data
  }
}
