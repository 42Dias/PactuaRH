import responseHandler from "../../utils/responseHandler"
import { api } from "../api"
import { toast } from "react-toastify";

export default async function cadastrarEmpresa(data) {
    return await api.post('empresa', data).then(
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