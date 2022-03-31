import {api} from '../api'




export default async function loadEmpresaQuantidade(){
    return await api.get(`empresa-count`)
          .then((response) => {
            // console.log(response)
            let data = response.data[0]
            return data.quantidadeDeEmpresas 
          });
}
