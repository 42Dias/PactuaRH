import {
  api,
  apiWithoutTenant,
  apiWithoutTenantAndWithToken,
  apiWithTenantAndWithToken,
  ip,
  porta,
} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'
import handleLocalStorageEmailAndPassword from 'utils/handleLocalStorageEmailAndPassword'
import HandleLocalStorageData from 'utils/handleLocalStorage'
import axios from 'axios'
import { toast } from 'react-toastify'
export default class cargos {
  static async update(id, data) {
    const response = await api
      .put(`user/${id}`, {
        data,
      })
      .catch(() => {
        servidorErrorMessage()
      })
    const mensagemOk = 'Usuário alterado com sucesso!'
    const mensagemNaoOK = 'Revise seus dados :('
    responseHandler(response.status, mensagemOk, mensagemNaoOK)

    const responseData = response.data

    return responseData
  }

  static async delete(id) {
    const response = await api
      .delete(`user/${id}`)
      .then((res) => {
        const status = res.status
        const mensagemOk = 'Modulo apagado com sucesso!'
        const mensagemNaoOK = 'Algo deu errado :('

        responseHandler(status, mensagemOk, mensagemNaoOK)
      })

      .catch(() => {
        servidorErrorMessage()
      })

    return response
  }

  static async list() {
    const response = await api.get('cargo').catch(() => {
      servidorErrorMessage()
    })

    const responseData = response.data.rows

    return responseData
  }

  static async listWithFilter(filter, value) {
    const response = await api
      .get(`user?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

    const responseData = response.data.rows

    return responseData
  }

  static async listWithManyFilters(filters) {
    const response = await api.get(`user?${filters}`).catch(() => {
      servidorErrorMessage()
    })

    const responseData = response.data.rows

    return responseData
  }

  static async find(id) {
    const response = await api
      .get(`user/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

    return response.data
  }

  static async cadastro(
    fullName,
    email,
    password,
    role,
    invitationToken,
    tenantId,
  ) {
    return apiWithoutTenant
      .post('auth/sign-up', {
        fullName: fullName,
        email: email,
        password: password,
        role: role,
        invitationToken: invitationToken,
        tenantId: tenantId,
      })
      .then(async (response) => {
        const mensagemOk = 'Opa, recebemos o seu registro :)'

        responseHandler(response.status, mensagemOk)

        if (response.status == 200) {
          await this.loadUser(response.data)
          handleLocalStorageEmailAndPassword(email, password)
          return 'ok'
        }
      })
      .catch(() => {
        servidorErrorMessage()
      })
  }

  static async loadUser(token) {
    const response = await axios({
      method: 'get',
      url: `${ip}:${porta}/api/auth/me`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      timeout: 50000,
    }).then((response) => {
      return response.data
    })

    const fullName = response.fullName
    const newRoleLocal = response.tenants[0].roles[0]
    const newTenatId = response.tenants[0].tenant.id
    const newId = response.id
    const newStatus = response.tenants[0].status
    // let empresaId = response.empresaId
    HandleLocalStorageData(
      newRoleLocal,
      newTenatId,
      newId,
      newStatus,
      token,
      fullName,
    )

    return response
  }
}
