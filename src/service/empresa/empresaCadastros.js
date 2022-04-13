import responseHandler from "../../utils/responseHandler"

import { toast } from "react-toastify";
import axios from 'axios';
import {api, ip, porta} from '../api'
import User from '../user/user';
import servidorErrorMessage from "utils/servidorErrorMessage";

export default class empresa{ 

  static async cadastrarEmpresa(data) {
    console.log("ola");
    return await api.post('empresa', {data}).then(
      (response) => {
        const status = response.status;
        const mensagemOk = 'Empresa Criada com sucessso! :)';
        const mensagemNotOk = 'Algo deu errado :(';
        responseHandler(status, mensagemOk, mensagemNotOk)

        console.log(response)
        if(response.status == 200){
            return 'ok'
        }
      }
    )
    .catch(
      (e) => {
        console.log(e)
        toast.error("Algo deu errado, verifique seus dados ou tente mais tarde")
      }
    )
  
  }

//********************************************************************************************/

  static async changeEmpresa(id, data){

    console.log(id)
    console.log(data)
    return await api.put(`empresa/${id}`, {data}).then(
        (res) => {
            console.log(data)
            console.log(res)
            let status = res.status;
            // let mensagemOk = 'Em modificada com sucesso :)';
            // let mensagemNaoOK = 'Algo deu errado :(';

            // responseHandler(status, mensagemOk, mensagemNaoOK);
            responseHandler(status);
            if(status == 200){
                return 'ok'
            }
        }
    
    )
  }

//********************************************************************************************/

  static async loadEmpresaQuantidade(){
    return await api.get(`empresa-count`)
          .then((response) => {
            // console.log(response)
            let data = response.data[0]
            return data.quantidadeDeEmpresas 
          });
  }

//********************************************************************************************/


  static async loadEmpresas(filterField, filterContent){
    let url;
    if(filterField){
        url = `empresa?filter%5B${filterField}%5D=${filterContent}`
    }
    else{
        url = `empresa`
    }
    console.log(url)
    return await api.get(url)
          .then((response) => {
            // console.log(response)
            let data = response.data.rows
            return data 
          });
  }

//********************************************************************************************/

  static async loadUserEmpresa(token) {
    let userData = await User.loadUser(token)
    
    let empresaId = userData.empresaId

    let empresaReq = await api.get(`empresa/${empresaId}`)

    let empresaData  = empresaReq.data

    console.log("empresaReq.data")
    console.log(empresaReq.data)

    return await empresaData
  }

//********************************************************************************************/

  static async deleteEmpresa(id){
    let response = await api.delete(`empresa/${id}`)
    .then(
      (res)=> {
        let status = res.status
        let mensagemOk = 'Modulo apagado com exito!'
        let mensagemNaoOk = 'Algo deu ruim :('

        responseHandler(status, mensagemOk, mensagemNaoOk)
      }
    )
    .catch(()=> {
      servidorErrorMessage()
    })

    return response;
    
  }
}