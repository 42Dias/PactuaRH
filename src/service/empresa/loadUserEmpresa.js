/*
Aqui ficará o loadUser
*/
import axios from 'axios';
import {api, ip, porta} from '../api'
import loadUser from '../loadUser';

export default async function loadUserEmpresa(token) {
    let userData = await loadUser(token)
    
    let empresaId = userData.empresaId

    let empresaReq = await api.get(`empresa/${empresaId}`)

    let empresaData  = empresaReq.data

    console.log("empresaReq.data")
    console.log(empresaReq.data)

    return await empresaData
  }