
import {api, apiWithoutTenant, apiWithoutTenantAndWithToken, apiWithTenantAndWithToken, ip, porta} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'
import handleLocalStorageEmailAndPassword from 'utils/handleLocalStorageEmailAndPassword'
import HandleLocalStorageData from 'utils/handleLocalStorage'
import axios from 'axios'
import { toast } from 'react-toastify'


export default class beneficio{
  static async create(data){
    let response = await api.post(`beneficio`, {
      data
      })

      .catch(() => {
        servidorErrorMessage()
      })

      let mensagemOk = 'Benefício criado com sucesso!'
      let mensagemNaoOK = 'Revise seus dados :('
      responseHandler(response.status, mensagemOk, mensagemNaoOK)

      let responseData = response.data
      return responseData
  }
//==========================================================================================================
  static async update(id, data){

    let response = await api.put(`beneficio/${id}`, {
      data
      })
      .catch(() => {
        servidorErrorMessage()
      })


      let mensagemOk = 'Benefício alterado com sucesso!'
      let mensagemNaoOK = 'Revise seus dados :('
      responseHandler(response.status, mensagemOk, mensagemNaoOK)

      let responseData = response.data

      return responseData    

  }
//==========================================================================================================
  static async delete(id){

    let response = await api.delete(`beneficio/${id}`)
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
//==========================================================================================================
  static async list(){

    let response = await api.get(`beneficio`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithFilter(filter ,value){

    let response = await api.get(`beneficio?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }
//==========================================================================================================
  static async listWithManyFilters(filters){
    let response = await api.get(`beneficio?${filters}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }
//==========================================================================================================
  static async find(id){

    let response = await api.get(`beneficio/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

      return response.data
    
  }

}