import {api} from '../api'




export default async function loadEmpresas(filterField, filterContent){
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
