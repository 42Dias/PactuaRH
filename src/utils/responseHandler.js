/*
Aqui ficará o tratamento da resposta usando toast
*/
import { toast } from 'react-toastify';



export default async function responseHandler(
    responseStatus, mensagemSeOk, mensagemSeNaoOk
    ) {
    if(responseStatus == 200 ){
        mensagemSeOk ? toast.success(mensagemSeOk) : toast.success("Ação feita com sucesso!") 
    }
    else {
        mensagemSeNaoOk ? toast.error(mensagemSeNaoOk) : toast.error("Algo deu errado :(") 
    }

}