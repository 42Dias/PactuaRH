
import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default class produtoModulo{
  static async create(data){
    let response = await api.post(`produtoModulo`, {
      data
      })

      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data
      return responseData

  }
  static async update(id, data){

    let response = await api.put(`produtoModulo/${id}`, {
      data
      })
      .catch(() => {
        servidorErrorMessage()
      })

      /*
      let mensagemOk = 'Seu produtoModulo foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)'
      let mensagemNaoOK = 'Revise os dados do produtoModulo :('
      responseHandler(response.status, mensagemOk, mensagemNaoOK)
      */
      let responseData = response.data

      return responseData    

  }
  static async delete(id){

    let response = await api.delete(`produtoModulo/${id}`)
    .then(
      (res) => {
          
          let status = res.status 
          let mensagemOk    = 'Modulo apagado com sucesso!'
          let mensagemNaoOK = 'Algo deu errado :('

          responseHandler(status, mensagemOk, mensagemNaoOK)
      })

      .catch(() => {
        servidorErrorMessage()
      })

      return response
  }

  static async list(){

    let response = await api.get(`produtoModulo`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithFilter(filter ,value){

    let response = await api.get(`produtoModulo?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithManyFilters(filters){
    let response = await api.get(`produtoModulo?${filters}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async find(id){

    let response = await api.get(`produtoModulo/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

      return response.data
    
  }


}