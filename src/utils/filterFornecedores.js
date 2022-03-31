
export default async function filterFornecedores(produtosNoCarrinho, setFunction){

  const containerDeObjetos     = []
  const fornecedoresNoCarrinho = []

  produtosNoCarrinho.filter(
    async (produtoNoCarrinho) => {
      if(!fornecedoresNoCarrinho.includes(produtoNoCarrinho.fornecedorId)){
        fornecedoresNoCarrinho.push(produtoNoCarrinho.fornecedorId)
      }
    }
  )
  

  fornecedoresNoCarrinho.map(
    (fornecedor) =>{ 
      const novoObj =  { "fornecedorId": fornecedor, "produtos": [] }
      containerDeObjetos.push(novoObj)
    }
  )

    // console.log("containerDeObjetos")
    // console.log(containerDeObjetos)

    // console.log(produtosNoCarrinho)
    // console.log(fornecedoresNoCarrinho)

    containerDeObjetos.map( (fornecedor, index )=>{
      produtosNoCarrinho.filter(
        (produtoNoCarrinho) => {
          if (fornecedor.fornecedorId == produtoNoCarrinho.fornecedorId){
            fornecedor.produtos.push(produtoNoCarrinho)
            fornecedor.produtos.map(
              (produtoDoFornecedor) => {
                produtoDoFornecedor.fornecedorId = fornecedor.fornecedorId
              }
            )
          }
        }
        )
        // console.log(fornecedor, index)
      }
      )
      setFunction(containerDeObjetos)
      return containerDeObjetos
}
