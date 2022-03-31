import responseHandler from '../../utils/responseHandler'
import {api} from '../api'


export default async function changeEmpresa(id, data){

    console.log(id)
    console.log(data)
    return await api.put(`empresa/${id}`, data).then(
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