
import { api } from '../api'
import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default class avaliacoes {

  /*=========================================================================================================
                                          CREATE FUNCTION
  ========================================================================================================*/
  static async create(data) {
    let response = await api.post(`avaliacao`, {
      data
    })

      .catch(() => {
        servidorErrorMessage()
      })

    let mensagemOk = 'Avaliação criada com sucesso!'
    let mensagemNaoOK = 'Revise seus dados :('
    responseHandler(response.status, mensagemOk, mensagemNaoOK)

    let responseData = response.data
    return responseData
  }

  /*=========================================================================================================
                                          UPDATE FUNCTION
  ========================================================================================================*/
  static async update(id, data) {

    let response = await api.put(`avaliacao/${id}`, {
      data
    })
    .catch(() => {
        servidorErrorMessage()
      })


    let mensagemOk = 'Avaliação alterada com sucesso!'
    let mensagemNaoOK = 'Revise seus dados :('
    responseHandler(response.status, mensagemOk, mensagemNaoOK)

    let responseData = response.data

    return responseData
  }

  /*=========================================================================================================
                                          DELETE FUNCTION
  ========================================================================================================*/
  static async delete(id) {

    let response = await api.delete(`avaliacao/${id}`)

    let status = res.status
    let mensagemOk = 'Modulo apagado com sucesso!'
    let mensagemNaoOK = 'Algo deu errado :('

    responseHandler(status, mensagemOk, mensagemNaoOK)

      .catch(() => {
        servidorErrorMessage()
      })

    return response
  }

/*=========================================================================================================
                                        LIST FUNCTION
========================================================================================================*/  static async list(filter) {

    let response = await api.get(`avaliacao?${filter}`)
      .catch(() => {
        servidorErrorMessage()
      })

    let responseData = response.data.rows

    return responseData
  }

/*=========================================================================================================
                                        FIND FUNCTION
========================================================================================================*/  static async find(id) {

    let response = await api.get(`avaliacao/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

    return response.data
  }

}