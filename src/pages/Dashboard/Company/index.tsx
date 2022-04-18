import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Company.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import empresa from 'service/empresa/empresaCadastros'
import { fullName, id } from 'service/api'

export default function Company() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)

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
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
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
        inscricaoEstadual: inscricaoEstadual,
        inscricaoMunicipal: inscricaoMunicipal
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
    
  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          <S.FlexButtons>
            <button onClick={openModalNew}>
              Novo <FiPlus size={18} color='#fff' />
            </button>
          </S.FlexButtons>

          <S.Table>
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

          <input type='number' placeholder='CNPJ' onChange={(e) => setCnpj(e.target.value)}/>
          <input type='text' placeholder='Razão Social'  onChange={(e) => setRazaoSocial(e.target.value)}/>
          <input type='text' placeholder='Nome fantasia' onChange={(e) => setNome(e.target.value)}/>
          <input type='text' placeholder='Inscrição Estadual' onChange={(e) => setInscricaoEstadual(e.target.value)}/>
          <input type='text' placeholder='Inscrição Municipal' onChange={(e) => setInscricaoMunicipal(e.target.value)}/>
          <input type='text' placeholder='CNAE'  onChange={(e) => setCnac(e.target.value)}/>
          <input type='text' placeholder='CEP*' onChange={(e) => setCep(e.target.value)}/>
          <input type='text' placeholder='Logradouro' onChange={(e) => setLogradouro(e.target.value)}/>

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
