
import {api, apiWithoutTenant, apiWithoutTenantAndWithToken, apiWithTenantAndWithToken, ip, porta} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'
import handleLocalStorageEmailAndPassword from 'utils/handleLocalStorageEmailAndPassword'
import HandleLocalStorageData from 'utils/handleLocalStorage'
import axios from 'axios'
import { toast } from 'react-toastify'


export default class dependente{
  static async create(data){
    let response = await api.post(`dependente`, {
      data
      })

      .catch(() => {
        servidorErrorMessage()
      })

      let mensagemOk = 'dependente criado com sucesso!'
      let mensagemNaoOK = 'Revise seus dados :('
      responseHandler(response.status, mensagemOk, mensagemNaoOK)

      let responseData = response.data
      return responseData
  }
//==========================================================================================================
  static async update(id, data){

    let response = await api.put(`dependente/${id}`, {
      data
      })
      .catch(() => {
        servidorErrorMessage()
      })


      let mensagemOk = 'dependente alterado com sucesso!'
      let mensagemNaoOK = 'Revise seus dados :('
      responseHandler(response.status, mensagemOk, mensagemNaoOK)

      let responseData = response.data

      return responseData    

  }
//==========================================================================================================
  static async delete(id){

    let response = await api.delete(`dependente/${id}`)
    .then(
      (res) => {
          
          let status = res.status 
          let mensagemOk    = 'Dependente apagado com sucesso!'
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

    let response = await api.get(`dependente`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithFilter(filter ,value){

    let response = await api.get(`dependente?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }
//==========================================================================================================
  static async listWithManyFilters(filters){
    let response = await api.get(`dependente?${filters}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }
//==========================================================================================================
  static async find(id){

    let response = await api.get(`dependente/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

      return response.data
    
  }

}