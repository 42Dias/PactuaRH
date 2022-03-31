
import {api, apiWithoutTenant, apiWithoutTenantAndWithToken, apiWithTenantAndWithToken} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'
import handleLocalStorageEmailAndPassword from 'utils/handleLocalStorageEmailAndPassword'
import HandleLocalStorageData from 'utils/handleLocalStorage'


export default class user{
  static async create(data){
    let response = await api.post(`user`, {
      data
      })

      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data
      return responseData

  }
  static async update(id, data){

    let response = await api.put(`user/${id}`, {
      data
      })
      .catch(() => {
        servidorErrorMessage()
      })

      /*
      let mensagemOk = 'Seu user foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)'
      let mensagemNaoOK = 'Revise os dados do user :('
      responseHandler(response.status, mensagemOk, mensagemNaoOK)
      */
      let responseData = response.data

      return responseData    

  }
  static async delete(id){

    let response = await api.delete(`user/${id}`)
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

    let response = await api.get(`user`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithFilter(filter ,value){

    let response = await api.get(`user?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithManyFilters(filters){
    let response = await api.get(`user?${filters}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async find(id){

    let response = await api.get(`user/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

      return response.data
    
  }


  static async login(email, password) {
    let response = await apiWithoutTenant.post(`auth/sign-in`, {
      email: email,
      password: password,
    })  
    .catch((error) => {
        if (error.response) return toast.error(error.response.data);
        servidorErrorMessage()
        return 

      })
     let messageOk = `Login efetuado com sucesso! :)`
     let messageNotOk = `Ops, Dados Incorretos!`
     
     responseHandler(response.status, messageOk, messageNotOk )
      if (response.status == 200) {

        let userData = await loadUser(response.data)
        handleLocalStorageEmailAndPassword(email, password)
        
        return userData.tenants[0].roles[0]
      }
    
  }


  static async cadastro( fullName, email, password,  role, invitationToken,  tenantId) {

    return apiWithoutTenant.post('auth/sign-up', {
      fullName:        fullName,
      email:           email, 
      password:        password, 
      role:            role, 
      invitationToken: invitationToken,
      tenantId:        tenantId
      })
      .then(
        async (response) => {

        let mensagemOk = 'Opa, recebemos o seu registro :)'

        responseHandler(response.status, mensagemOk)

        if (response.status == 200) {
          await loadUser(response.data)
          handleLocalStorageEmailAndPassword(email, password)
          return 'ok'
        }

      })
      .catch(() => {
        servidorErrorMessage()
      })
  }


  static async loadUser(token) {
    const response = await apiWithoutTenantAndWithToken.get('auth/me')
    .then(response => {
      return response.data;
    })

    console.log(response)


    let newRoleLocal = response.tenants[0].roles[0]
    let newTenatId = response.tenants[0].tenant.id
    let newId = response.id
    let newStatus = response.tenants[0].status
    let empresaId = response.empresaId
    HandleLocalStorageData(newRoleLocal, newTenatId, newId, newStatus, token, empresaId)

    return response
  }



}