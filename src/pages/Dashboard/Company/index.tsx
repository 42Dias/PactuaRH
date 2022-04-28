import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Company.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import empresa from 'service/empresa/empresaCadastros'
import { fullName, id } from 'service/api'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default function Company() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)

  const [cnpj       , setCnpj       ] = useState<string>("")
  const [id         , setId         ] = useState<string>("")
  const [cnac       , setCnac       ] = useState<string>("")
  const [nome       , setNome       ] = useState<string>("")
  const [razaoSocial, setRazaoSocial] = useState<string>("")
  const [cep        , setCep        ] = useState<string>("")
  const [logradouro , setLogradouro ] = useState<string>("")
  const [allEmpresa , setAllEmpresa ] = useState<any[]>([])
  const [empresaEdit, setEmpresaEdit ] = useState<any>({})
  const [inscricaoEstadual, setInscricaoEstadual] = useState<string>("")
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState<string>("")

  function clearFields(){
    setCnpj("")
    setCnac("")
    setNome("")
    setRazaoSocial("")
    setCep("")
    setLogradouro("")
    setEmpresaEdit("")
    setInscricaoEstadual("")
    setInscricaoMunicipal("")
  }

  function openModal() {
    setIsOpen(true)
  }

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)

    clearFields()
  }


  function closeModal() {
    setIsOpen(false)

    clearFields()

  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)

    clearFields()
  }

  /*
  
  IMPORTANT OBS.: This plataform works as Multi-Tenant so a admin can only see its own employees,
  HE CANNOT SEE ANY OTHER EMPLOYEE INSTEAD OF ITS OWN! 

  */ 

  /*
  
    IT CREATES A ENTERPRISE WITH ADMIN's TENANTID 
  
  */
    async function handleLoaderEmpresa(){
      const empresaCadastradas = await empresa.loadEmpresas();
      console.log(empresaCadastradas);
      setAllEmpresa(empresaCadastradas);
    }
    useEffect(
      () => {
        handleLoaderEmpresa()
      },[]
    )

    async function cadastrarEmpresa() {
      let data = {
        user: id,
        nome: nome,
        cnpj: cnpj,
        cnac: cnac,
        razaoSocial: razaoSocial,
        cep: cep,
        logradouro: logradouro,
        inscricaoMunicipal: inscricaoMunicipal,
        inscricaoEstadual: inscricaoEstadual,
      }

      //alert(data.cnpj);

      let isCreated =  await empresa.cadastrarEmpresa(data)

      if(!isCreated) return;

      closeModalNew()
      await handleLoaderEmpresa()
      
    }

    async function updateEmpresas(empresaId: string){
      let data = {
        nome: nome,
        cnpj: cnpj,
        cnac: cnac,
        razaoSocial: razaoSocial,
        cep: cep,
        logradouro: logradouro,
        inscricaoEstadual: inscricaoEstadual,
        inscricaoMunicipal: inscricaoMunicipal,
        user: id
      }

      let updateEmpresas = await empresa.changeEmpresa(empresaId, data)

      if(updateEmpresas) closeModal()

      await handleLoaderEmpresa();
    }

    async function deleteEmpresa(empresaId: string){
      await empresa.deleteEmpresa(empresaId)
      await handleLoaderEmpresa()

    }
  
    async function handleFilterEmpresa(){

      console.log("oujbnbojfdnbfnjbnfkdjnbkjdfnbndfbndfbkjfgjk")
      let filter = ''
  
      if (nome){
        console.log("tem nome")
        if(filter.length != 0 ) filter += '&'
        filter += `filter%5Bnome%5D=${nome}`
      }

      if (cnpj) {
        console.log("tem cnpj")
        if (filter.length != 0) filter += '&'
        filter += `filter%5Bcnpj%5D=${cnpj}`
      }
      if (cnac) {
        console.log("tem cnac")
        if (filter.length != 0) filter += '&'
        filter += `filter%5Bcnac%5D=${cnac}`
      }
      if (razaoSocial) {
        console.log("tem razaoSocial")
        if (filter.length != 0) filter += '&'
        filter += `filter%5BrazaoSocial%5D=${razaoSocial}`
      }
      if (logradouro) {
        console.log("tem logradouro")
        if (filter.length != 0) filter += '&'
        filter += `filter%5Blogradouro%5D=${logradouro}`
      }
      if (inscricaoEstadual) {
        console.log("tem inscricaoEstadual")
        if (filter.length != 0) filter += '&'
        filter += `filter%5BinscricaoEstadual%5D=${inscricaoEstadual}`
      }

      if (inscricaoMunicipal) {
        console.log("tem inscricaoMunicipal")
        if (filter.length != 0) filter += '&'
        filter += `filter%5BinscricaoMunicipal%5D=${inscricaoMunicipal}`
      }
  
      let empresaFilted = await empresa.listWithManyFilters(filter)
  
      setAllEmpresa(empresaFilted)
      console.log(empresaFilted)
  
      closeModalFilter()
    }
      

  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          <S.FlexButtons>
            <div>
            <button onClick={openModalNew}>
                Novo <FiPlus size={18} color='#fff' />
              </button>
              <button 
             
              onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table="empresa"
              filename="Pactua Empresa Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          <S.Table id="empresa">
            <S.TrTitle>
              <td>CNPJ</td>
              <td>Razão Social</td>
              <td>Nome fantasia</td>
              <td>CNAE</td>
            </S.TrTitle>
            {allEmpresa.map(
              (empresa) => (
                <S.TrSecond>
                  <td>{empresa.cnpj}</td>
                  <td>{empresa.razaoSocial}</td>
                  <td>{empresa.nome}</td>
                  <td>{empresa.cnac}</td>
                  <td>

                  <button onClick={() => {openModal()
                    setEmpresaEdit(empresa)
                  }}>
                    <FiEdit size={18} />
                  </button> 
                  </td>
                  
                  <td>
                    <button onClick={()=>deleteEmpresa(empresa.id)}>
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              )
            )}
            
          </S.Table>
        </S.Container>
      </S.Body>

          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName='react-modal-overlay'
          className='react-modal-content'
        >
          <button
            className='react-modal-close'
            type='button'
            onClick={closeModal}
          >
            <FiX />
          </button>
          <S.ContainerForm
          onSubmit={
            (e: any)=>{
              e.preventDefault()
              updateEmpresas(empresaEdit.id)
            }
          }
          >
            <h2>Editar Empresa</h2>
          
            <input type='text' defaultValue={empresaEdit?.cnpj} onChange={(e)=> setCnpj(e.target.value)} />
            <input type='text' defaultValue={empresaEdit?.razaoSocial} onChange={(e)=> setRazaoSocial(e.target.value)} />
            <input type='text' defaultValue={empresaEdit?.nome} onChange={(e)=> setNome(e.target.value)} />
            <input type='text' defaultValue={empresaEdit?.inscricaoEstadual} onChange={(e)=> setInscricaoEstadual(e.target.value)} />
            <input type='text' defaultValue={empresaEdit?.inscricaoMunicipal} onChange={(e)=> setInscricaoMunicipal(e.target.value)} />
            <input type='text' defaultValue={empresaEdit?.cnac} onChange={(e)=> setCnac(e.target.value)} />
            <input type='text' defaultValue={empresaEdit?.cep} onChange={(e)=> setCep(e.target.value)} />
            <input type='text' defaultValue={empresaEdit?.logradouro} onChange={(e)=> setLogradouro(e.target.value)} />
            <button type="submit">Enviar</button>
          </S.ContainerForm>
         
        </Modal>
        
      <Modal
        isOpen={modalIsOpenNew}
        onRequestClose={closeModalNew}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalNew}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={(e)=>{cadastrarEmpresa()
            e.preventDefault()
          }}
        >
          <h2>Cadastrar empresa</h2>

          <label htmlFor="">CNPJ</label>
          <input type='number' placeholder='CNPJ' onChange={(e) => setCnpj(e.target.value)}/>
          <label htmlFor="">Razão social</label>
          <input type='text' placeholder='Razão Social'  onChange={(e) => setRazaoSocial(e.target.value)}/>
          <label htmlFor="">Nome fantasia</label>
          <input type='text' placeholder='Nome fantasia' onChange={(e) => setNome(e.target.value)}/>
          <label htmlFor="">Inscrição social</label>
          <input type='text' placeholder='Inscrição Estadual' onChange={(e) => setInscricaoEstadual(e.target.value)}/>
          <label htmlFor="">Inscrição municipal</label>
          <input type='text' placeholder='Inscrição Municipal' onChange={(e) => setInscricaoMunicipal(e.target.value)}/>
          <label htmlFor="">CNAE</label>
          <input type='text' placeholder='CNAE'  onChange={(e) => setCnac(e.target.value)}/>
          <label htmlFor="">CEP</label>
          <input type='text' placeholder='CEP*' onChange={(e) => setCep(e.target.value)}/>
          <label htmlFor="">Logradouro</label>
          <input type='text' placeholder='Logradouro' onChange={(e) => setLogradouro(e.target.value)}/>

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

      
      <Modal
        isOpen={modalIsOpenFilter}
        onRequestClose={closeModalFilter}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalFilter}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={(e)=>{
            e.preventDefault()
            handleFilterEmpresa()
          }}
        >
          <h2>Cadastrar empresa</h2>

          
          <label 
          htmlFor="">CNPJ</label>
          <input 
          type='number'
          placeholder='CNPJ'
          onChange={(e) => setCnpj(e.target.value)}
          />
          
          <label 
          htmlFor="">Razão social</label>
          <input 
          type='text'
          placeholder='Razão Social' 
          onChange={(e) => setRazaoSocial(e.target.value)}
          />
          
          <label 
          htmlFor="">Nome fantasia</label>
          <input 
          type='text'
          placeholder='Nome fantasia'
          onChange={(e) => setNome(e.target.value)}
          />
          
          <label 
          htmlFor="">Inscrição social</label>
          <input 
          type='text'
          placeholder='Inscrição Estadual'
          onChange={(e) => setInscricaoEstadual(e.target.value)}
          />
          
          <label 
          htmlFor="">Inscrição municipal</label>
          <input 
          type='text'
          placeholder='Inscrição Municipal'
          onChange={(e) => setInscricaoMunicipal(e.target.value)}
          />
          
          <label 
          htmlFor="">CNAE</label>
          <input 
          type='text'
          placeholder='CNAE' 
          onChange={(e) => setCnac(e.target.value)}
          />
          
          <label 
          htmlFor="">CEP</label>
          <input 
          type='text'
          placeholder='CEP*'
          onChange={(e) => setCep(e.target.value)}
          />
          
          <label 
          htmlFor="">Logradouro</label>
          <input 
          type='text'
          placeholder='Logradouro'
          onChange={(e) => setLogradouro(e.target.value)}
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
