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
import { toast } from 'react-toastify'

import checkCNPJ from '../../../utils/checkCNPJ'
import LoadingLayer from 'ui/components/LoadingLayer'
import InputsContainer from 'ui/components/InputsContainer'
import DeleteButton from 'ui/components/DeleteButton'
import EditButton from 'ui/components/EditBtn'


export default function Company() {


  //===================================== Modal's States
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)

  //===================================== CRUD's States
  const [cnpj, setCnpj] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [cnac, setCnac] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [razaoSocial, setRazaoSocial] = useState<string>("")
  const [cep, setCep] = useState<string>("")
  const [logradouro, setLogradouro] = useState<string>("")
  const [allEmpresa, setAllEmpresa] = useState<any[]>([])
  const [empresaEdit, setEmpresaEdit] = useState<any>({})
  const [inscricaoEstadual, setInscricaoEstadual] = useState<string>("")
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState<string>("")

  //===================================== Loading's States
  const [loading, setLoading] = useState(true);





  /* 
  ==========================================================================================================
                                          Modal's Functions
  ==========================================================================================================
  */
  function clearFields() {
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
  ==========================================================================================================
                                          Crud's Functions
  ==========================================================================================================
  */
  /*
  IMPORTANT OBS.: This plataform works as Multi-Tenant so a admin can only see its own employees,
  HE CANNOT SEE ANY OTHER EMPLOYEE INSTEAD OF ITS OWN! 
  */

  /*
    IT CREATES A ENTERPRISE WITH ADMIN's TENANTID 
  */
  async function handleLoaderEmpresa() {


    const empresaCadastradas = await empresa.loadEmpresas();
    setAllEmpresa(empresaCadastradas);

    setLoading(false)
  }


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

    let isCreated = await empresa.cadastrarEmpresa(data)

    if (!isCreated) return;

    closeModalNew()
    await handleLoaderEmpresa()

  }

  async function updateEmpresas(empresaId: string) {
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

    if (updateEmpresas) closeModal()

    await handleLoaderEmpresa();
  }

  async function deleteEmpresa(empresaId: string) {
    await empresa.deleteEmpresa(empresaId)
    await handleLoaderEmpresa()

  }


  /* 
  ==========================================================================================================
                                          Filters's Functions
  ==========================================================================================================
  */

  async function handleFilterEmpresa() {

    let filter = ''

    if (nome) {

      if (filter.length != 0) filter += '&'
      filter += `filter%5Bnome%5D=${nome}`
    }

    if (cnpj) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bcnpj%5D=${cnpj}`
    }
    if (cnac) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bcnac%5D=${cnac}`
    }
    if (razaoSocial) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BrazaoSocial%5D=${razaoSocial}`
    }
    if (logradouro) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Blogradouro%5D=${logradouro}`
    }
    if (inscricaoEstadual) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BinscricaoEstadual%5D=${inscricaoEstadual}`
    }

    if (inscricaoMunicipal) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BinscricaoMunicipal%5D=${inscricaoMunicipal}`
    }

    let empresaFilted = await empresa.listWithManyFilters(filter)

    setAllEmpresa(empresaFilted)

    closeModalFilter()
  }
  // 
  function handleChangeCnpj(cnpjEntered: string) {
    setCnpj(cnpjEntered)

    let cnpjCleanered = cnpjEntered.replace(/[^\d]+/g, '')


    if (cnpjCleanered.length != 14) return;

    let isValid = checkCNPJ(cnpjEntered)
    if (!isValid) toast.error(" CNPJ Inv??lido")
    else toast.success("CNPJ V??lido")
  }

  /* 
  ==========================================================================================================
                                            UseEffect
  ==========================================================================================================
  */
  useEffect(
    () => {
      handleLoaderEmpresa()
    }, []
  )


  return (
    <>
      <S.Body>
        <Sidebar />
        <LoadingLayer loading={loading} />

        <S.Title>
          <S.Container>Bem vindo, {fullName} ????</S.Container>
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
              <td>Raz??o Social</td>
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

                    <EditButton onClick={() => {
                      openModal()
                      setEmpresaEdit(empresa)
                    }}>
                      <FiEdit size={18} />
                    </EditButton>
                  </td>

                  <td>
                    <DeleteButton onClick={() => deleteEmpresa(empresa.id)}>
                      <FiTrash size={18} />
                    </DeleteButton>
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
            (e: any) => {
              e.preventDefault()
              updateEmpresas(empresaEdit.id)
            }
          }
        >
          <h2>Editar Empresa</h2>
          
          <InputsContainer>
          <div>
          <label htmlFor=''>CNPJ</label>
          <InputMask
            required
            defaultValue={empresaEdit?.cnpj}
            mask="99.999.999/9999-99"
            placeholder='CNPJ'
            onChange={(e) => handleChangeCnpj(e.target.value)
            }
          />
          </div>
          
          <div>
          <label htmlFor=''>Raz??o Social</label>
          <input
            type='text'
            defaultValue={empresaEdit?.razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
          />
          </div>
          </InputsContainer>
           
          
          <InputsContainer>
          <div>
          <label htmlFor=''>Nome</label>
          
          <input
            type='text'
            defaultValue={empresaEdit?.nome}
            onChange={(e) => setNome(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor=''>Inscri????o Estadual</label>
          <InputMask
            required
            mask="999.999.999.999"
            type='text'
            defaultValue={empresaEdit?.inscricaoEstadual}
            onChange={(e) => setInscricaoEstadual(e.target.value)}
          />
          </div>
          </InputsContainer>
          
          <InputsContainer>
          <div>
          <label htmlFor=''>Inscri????o Municipal</label>
          <input
            type='text'
            defaultValue={empresaEdit?.inscricaoMunicipal}
            onChange={(e) => setInscricaoMunicipal(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor=''>CNAC</label>
          <input
            type='text'
            defaultValue={empresaEdit?.cnac}
            onChange={(e) => setCnac(e.target.value)}
          />
          </div>
          </InputsContainer>
          
          <InputsContainer>
          
          <div>
          <label htmlFor=''>CEP</label>
          <input
            type='text'
            defaultValue={empresaEdit?.cep}
            onChange={(e) => setCep(e.target.value)}
          />
          </div>
          
          <div>
          <label htmlFor=''>Logradouro</label>
          <input
            type='text'
            defaultValue={empresaEdit?.logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
          </div>
          </InputsContainer>

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
          onSubmit={(e) => {
            cadastrarEmpresa()
            e.preventDefault()
          }}
        >
          <h2>Cadastrar empresa</h2>
          
          <InputsContainer>
          <div>
          <label htmlFor="">CNPJ</label>

          <InputMask
            required
            mask="99.999.999/9999-99"
            placeholder='CNPJ'
            onChange={(e) => handleChangeCnpj(e.target.value)}
          />
          </div>
          <div>
          <label
            htmlFor="">Raz??o social</label>
          <input
          type='text' placeholder='Raz??o Social'  onChange={(e) => setRazaoSocial(e.target.value)}/>
          </div>
          </InputsContainer>
          
          <InputsContainer>
          <div>
          <label
            htmlFor="">Nome fantasia</label>
          <input
          type='text'
          placeholder='Nome fantasia'
          onChange={(e) => setNome(e.target.value)}/>
          </div>
          <div>
          <label
            htmlFor="">Inscri????o Estadual</label>
          <InputMask
          mask="999.999.999.999" 
          type='text'
          placeholder='Inscri????o Estadual'
          onChange={(e) => setInscricaoEstadual(e.target.value)}/>
          </div>
          </InputsContainer>
           
          <InputsContainer>
          <div>
          <label
            htmlFor="">Inscri????o municipal</label>
          <input
          type='text'
          placeholder='Inscri????o Municipal'
          onChange={(e) => setInscricaoMunicipal(e.target.value)}/>
          </div>

          <div>
          <label
            htmlFor="">CNAE</label>
          <input
          type='text' 
          placeholder='CNAE'
          onChange={(e) => setCnac(e.target.value.replace(/[^0-9-./]/g, ''))}/>
          </div>
          </InputsContainer>
          
          <InputsContainer>
          <div>
          <label
          htmlFor="">CEP</label>
          <InputMask
          mask="99.999-999"
          type='text'
          placeholder='CEP*' 
          onChange={(e) => setCep(e.target.value)}/>
          </div>
          
          <div>
          <label
          htmlFor="">Logradouro</label>
          <input
          type='text'
          placeholder='Logradouro'
          onChange={(e) => setLogradouro(e.target.value)}/>
          </div>
          </InputsContainer>


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
          onSubmit={(e) => {
            e.preventDefault()
            handleFilterEmpresa()
          }}
        >
          <h2>Filtro</h2>


          <label
            htmlFor="">CNPJ</label>
          <InputMask

            mask="99.999.999/9999-99"
            // type='number'
            placeholder='CNPJ'
            onChange={(e) => handleChangeCnpj(e.target.value)}
          />
          
          
          
          <label 
          htmlFor="">Raz??o social</label>
          <input
          
          type='text'
          placeholder='Raz??o Social' 
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
            htmlFor="">Inscri????o Estadual</label>
          <InputMask

            mask="999.999.999.999"
            placeholder='Inscri????o Estadual'
            onChange={(e) => setInscricaoEstadual(e.target.value)}
          />

          <label
            htmlFor="">Inscri????o municipal</label>
          <input
            type='text'
            placeholder='Inscri????o Municipal'
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
          <InputMask
          mask="99.999-999" 
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
