export default async function cepInformation (cep) {

    if (cep.length !== 8) {
      return
    }

    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        return data
      })
  }