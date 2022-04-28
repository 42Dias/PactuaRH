import { api } from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'
export default class centroCustos {
  static async create(data) {
    const response = await api
      .post('centroCustos', {
        data,
      })
      .catch(() => {
        servidorErrorMessage()
      })

    console.log(response)

    const mensagemOk = 'Centro de Custos criado com sucesso!'
    const mensagemNaoOK = 'Revise seus dados :('
    responseHandler(response.status, mensagemOk, mensagemNaoOK)

    const responseData = response.data
    return responseData
  }

  //= =========================================================================================================
  static async update(id, data) {
    const response = await api
      .put(`centroCustos/${id}`, {
        data,
      })
      .catch(() => {
        servidorErrorMessage()
      })
    const mensagemOk = 'Centro de Custos alterado com sucesso!'
    const mensagemNaoOK = 'Revise seus dados :('
    responseHandler(response.status, mensagemOk, mensagemNaoOK)

    const responseData = response.data

    return responseData
  }

  //= =========================================================================================================
  static async delete(id) {
    const response = await api
      .delete(`centroCustos/${id}`)
      .then((res) => {
        const status = res.status
        const mensagemOk = 'Modulo apagada com sucesso!'
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
    const response = await api.get('centroCustos').catch(() => {
      servidorErrorMessage()
    })

    const responseData = response.data.rows
    console.log(responseData)
    return responseData
  }

  static async listWithFilter(filter, value) {
    const response = await api
      .get(`centroCustos?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

    const responseData = response.data.rows

    return responseData
  }

  //= =========================================================================================================
  static async listWithManyFilters(filters) {
    const response = await api.get(`centroCustos?${filters}`).catch(() => {
      servidorErrorMessage()
    })

    const responseData = response.data.rows

    return responseData
  }

  //= =========================================================================================================
  static async find(id) {
    const response = await api
      .get(`centroCustos/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

    return response.data
  }
}
