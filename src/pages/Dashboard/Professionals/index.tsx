import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Professionals.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import user from 'service/user/user'
// import profissional from 'service/profissional/profissional'
import cepInformation from 'utils/cepInformation'
import { fullName } from 'service/api'
import { Checkbox } from '../Area/Area.styled'
import { toast } from 'react-toastify'
import { checkCPF } from 'utils/checkCPF'
import { iCargo } from 'types'
import cargos from 'service/cargos/cargos'
import { isNullOrUndefined } from 'util'

//import moment from 'moment'
import profissional from 'service/profissional/profissional'
import dependente from 'service/dependente/dependente'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import LoadingLayer from 'ui/components/LoadingLayer'
import centroCustos from 'service/centroCustos/centroCustos'

interface iDependent {
  id?: string
  nome: string
  cpf: string
  rg: string
  dataNas: string
}

interface ICentroCustos {
  id?: string
  nome: string
  descricao: string
  importHash: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  tenantId: string
  createdById: string
  updatedById: string
  codigo: number
}

export default function Professionals() {



  //===================================== Modal's States
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)

  //===================================== Crud's States
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [userSelected, setUserSelected] = useState<any>()
  const [selectedProfessional, setSelectedProfessional] = useState<any>()
  const [profissionals, setProfissionals] = useState<any[]>([])
  const [descricao, setDescricao] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [nascimento, setNascimento] = useState<string>('')
  const [genero, setGenero] = useState<string>('')
  const [estado, setEstado] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [rg, setRg] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [nomeMae, setNomeMae] = useState<string>('')
  const [cargo, setCargo] = useState<string>('')
  const [cep, setCep] = useState<string>('')
  const [logradouro, setLogradouro] = useState<string>('')
  const [bairro, setBairro] = useState<string>('')
  const [numero, setNumero] = useState<string>('')
  const [cidade, setCidade] = useState<string>('')
  const [telefone, setTelefone] = useState<string>('')
  const [telefone2, setTelefone2] = useState<string>('')
  const [estadoCivil, setEstadoCivil] = useState<string>('')
  const [hasDependente, setHasDependente] = useState<boolean>(false)
  const [centroCustoId, setCentroCustoId] = useState<string>()

  // n-m association
  const [dependentes, setDependentes] = useState<iDependent[]>([])
  const [dependentesNew, setDependentesNew] = useState<iDependent[]>([])
  const [allPositions, setAllPositions] = useState<iCargo[]>([])
  const [centroCustoList, setCentroCustoslist] = useState<ICentroCustos[]>()

  //===================================== Loading's States
  const [loading, setLoading] = useState(true);

  /* 
  ==========================================================================================================
                                          Modal's Functions
  ==========================================================================================================
  */
  function clearFields() {
    setDependentes([])
    setDependentesNew([])
    setDescricao("")
    setEmail("")
    setNascimento("")
    setGenero("")
    setEstado("")
    setNome("")
    setRg("")
    setCpf("")
    setNomeMae("")

    setCargo("")
    setCep("")
    setLogradouro("")
    setBairro("")
    setNumero("")
    setCidade("")
    setTelefone("")
    setTelefone2("")
    setEstadoCivil("")
    setHasDependente(false)

  }

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModalNew() {
    clearFields()
    setIsOpenNew(true)
  }

  function closeModalNew() {
    clearFields()
    setIsOpenNew(false)
  }


  /* 
  ==========================================================================================================
                                          Crud's Functions
  ==========================================================================================================
  */

  async function handleChangeCep(cepText: string) {
    const cep = cepText.replace(/[^0-9]/g, '')

    if (cep.length == 8) {
      const data = await cepInformation(cep)
      setCep(data.cep)
      setLogradouro(data.logradouro)
      setBairro(data.bairro)
      setCidade(data.localidade)
      setEstado(data.uf)
    }
  }

  // ============================== Main Functions

  async function handleLoadProfessionals() {


    const allProfissionals = await profissional.list()
    setProfissionals(allProfissionals)

    setLoading(false)
  }
  async function handleCreateProfessional() {

    if (userSelected) setEmail(userSelected.email)

    const data = {
      nome: nome || userSelected?.fullname,
      cpf: cpf,
      rg: rg,
      descricao: descricao,
      dataNasc: nascimento,
      nomeMae: nomeMae,
      cep: cep,
      email: email,
      cidade: cidade,
      bairro: bairro,
      logradouro: logradouro,
      numero: numero,
      telefone1: telefone,
      telefone2: telefone2,
      dependentes: dependentes,
      cargo: cargo,
      userId: userSelected.id,
      genero: genero,
      estado: estado,
      estadoCivil: estadoCivil,
      centroCustoId: centroCustoId
      // complemento: complemento,
    }
    const isCreated = await profissional.create(data)

    handleLoadProfessionals()

    if (isCreated) closeModalNew()
  }

  async function handleDelete(id: string) {
    await profissional.delete(id)
    handleLoadProfessionals()
  }

  async function handleUpdate() {
    const id = selectedProfessional.id

    const data = {
      nome: nome || selectedProfessional?.nome,
      cpf: cpf || selectedProfessional?.cpf,
      descricao: descricao || selectedProfessional?.descricao,
      rg: rg || selectedProfessional?.rg,
      userId: '' || selectedProfessional?.userId,
      dataNasc: nascimento || selectedProfessional?.dataNas,
      nomeMae: nomeMae || selectedProfessional?.nomeMae,
      cep: cep || selectedProfessional?.cep,
      estadoCivil: estadoCivil || selectedProfessional?.estadoCivil,
      email: email || selectedProfessional?.email,
      cidade: cidade || selectedProfessional?.cidade,
      bairro: bairro || selectedProfessional?.bairro,
      logradouro: logradouro || selectedProfessional?.logradouro,
      numero: numero || selectedProfessional?.numero,
      telefone1: telefone || selectedProfessional?.telefone1,
      telefone2: telefone2 || selectedProfessional?.telefone2,
      cargo: cargo || selectedProfessional?.cargo.id,
      dependentes: dependentes || selectedProfessional?.dependentes,
      dependentesNew: dependentesNew,
      centroCustoId: centroCustoId || selectedProfessional?.centroCustoId

    }
    const isUpdated = await profissional.update(id, data)

    handleLoadProfessionals()

    closeModal()
  }

  async function handleCentroCustos() {
    const allCostCenter = await centroCustos.list()
    setCentroCustoslist(allCostCenter)
  }

  // ============================== Handle Change Screen elements
  const addFormFields = () => {
    // @ts-ignore
    setDependentes([...dependentes, { name: '', email: '' }])
  }
  const handleChangeDependente = (
    i: number,
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    const newFormValues = [...dependentes]
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value

    setDependentes(newFormValues)
  }

  const removeFormFields = (i: number) => {
    const newFormValues = [...dependentes]
    newFormValues.splice(i, 1)
    setDependentes(newFormValues)
  }

  const addFormFieldsNew = () => {
    // @ts-ignore
    setDependentesNew([...dependentesNew, {}])
  }

  const handleChangeDependenteNew = (
    i: number,
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    const newFormValues = [...dependentesNew]
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value

    setDependentesNew(newFormValues)
  }

  const removeFormFieldsNew = (i: number) => {
    const newFormValues = [...dependentesNew]
    newFormValues.splice(i, 1)
    setDependentesNew(newFormValues)
  }

  // ============================== Handle SubCruds
  async function handleLoadPosition() {
    const cargo = await cargos.list()


    setAllPositions(cargo)
  }
  async function getUsers() {
    const users = await user.list()

    setAllUsers(users)
  }
  // ============================== Handle Subcrud Dependents
  async function handleRemoveDependent(id?: string) {
    await dependente.delete(id)
  }



  /* 
  ==========================================================================================================
                                            UseEffect
  ==========================================================================================================
  */


  useEffect(() => {
    handleCentroCustos()
    handleLoadPosition()
  }, [])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    handleLoadProfessionals()
  }, [])



  /* 
 ==========================================================================================================
                                             Filter
 ==========================================================================================================
 */

  async function handleFilterProfessionals() {

    let filter = ''

    if (nome) {
      filter += `filter%5Bnome%5D=${nome}`
    }
    if (cpf) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bcpf%5D=${cpf}`

    }

    if (rg) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Brg%5D=${rg}`

    }

    if (nascimento) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BdataNasc%5D=${nascimento}`

    }

    if (nomeMae) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BnomeMae%5D=${nomeMae}`

    }

    if (cep) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bcep%5D=${cep}`

    }

    if (estadoCivil) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5BestadoCivil%5D=${estadoCivil}`

    }

    if (email) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bemail%5D=${email}`

    }

    if (cidade) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bcidade%5D=${cidade}`

    }
    if (cargo) {
      if (filter.length != 0) filter += '&'
      filter += `filter%5Bcargo%5D=${cargo}`

    }


    let professionalsFiltered = await profissional.listWithManyFilters(filter)

    setProfissionals(professionalsFiltered)

    closeModalFilter()

  }

  return (
    <>
      <S.Body>
        <Sidebar />
        <LoadingLayer loading={loading} />

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
              table="profissionais"
              filename="Pactua Profissionais Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>

          <S.Table id="profissionais">
            <S.TrTitle>
              <td>Nome</td>
              <td>CPF</td>
              <td>RG</td>
              <td>Cargo</td>
            </S.TrTitle>
            {profissionals.map((value: any, index) => (
              <S.TrSecond key={index}>
                <td>{value.nome}</td>
                <td>{value.cpf}</td>
                <td>{value.rg}</td>
                <td>{value.cargo?.nome}</td>
                <td>
                  <button
                    onClick={() => {

                      setSelectedProfessional(value)
                      setHasDependente(value.dependente.length >= 1)
                      setDependentes(value.dependente)
                      setCargo(value.cargo.id)

                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(value.id)}>
                    <FiTrash size={18} />
                  </button>
                </td>
              </S.TrSecond>
            ))}
          </S.Table>
        </S.Container>
      </S.Body>

      {/*
==========================================================================================================
                                                  EDIT!
==========================================================================================================
*/}

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
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate()
          }}
        >
          <h2>Editar profissional</h2>

          <h4>Selecione um profissional</h4>

          <input
            required
            type='text'
            defaultValue={userSelected?.fullName || selectedProfessional?.nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome'
          />

          <InputMask
            // defaultValue={userSelected?.cpf}
            required
            onChange={(e) => setCpf(e.target.value)}
            mask='999.999.999-99'
            placeholder='Seu CPF'
            defaultValue={selectedProfessional?.cpf}
          />

          <InputMask
            required
            // defaultValue={userSelected?.rg}
            onChange={(e) => setRg(e.target.value)}
            mask='99.999.999-9'
            placeholder='Seu RG'
            defaultValue={selectedProfessional?.rg}
          />

          <input
            required
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            defaultValue={selectedProfessional?.descricao}
          />

          <input
            type='date'
            required
            placeholder='Data de nascimento'
            value={nascimento}
            defaultValue={selectedProfessional?.dataNas}
            onChange={(e) => setNascimento(e.target.value)}
          />

          {/* These are not saved in user data */}
          <input
            type='text'
            required
            placeholder='Nome da mãe'
            value={nomeMae}
            defaultValue={selectedProfessional?.nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
          />

          <InputMask
            className='masked-input'
            type='text'
            required
            name='phoneNumber'
            mask='(99) 99999-9999'
            placeholder='Telefone'
            defaultValue={selectedProfessional?.telefone1}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <InputMask
            className='masked-input'
            type='text'
            required
            name='phoneNumber'
            mask='(99) 99999-9999'
            placeholder='Telefone 2'
            defaultValue={selectedProfessional?.telefone2}
            onChange={(e) => setTelefone2(e.target.value)}
          />

          <select
            // value={cargo}
            defaultValue={selectedProfessional?.cargo.id}
            required
            onChange={(e) => setCargo(e.target.value)}
          >
            <option hidden>Cargo</option>
            {allPositions.map((position) => (
              <option key={position.id} value={position.id}>{position.nome}</option>
            ))}
          </select>

          <InputMask
            onChange={(e) => setCep(e.target.value)}
            onBlur={(ev) => handleChangeCep(ev.target.value)}
            mask='99999-999'
            placeholder='CEP*'
            defaultValue={selectedProfessional?.cep}
            value={cep}
          />


          <input
            type='text'
            placeholder='Cidade*'
            // value={cidade}
            required
            defaultValue={selectedProfessional?.cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <input
            type='text'
            placeholder='Bairro*'
            // value={bairro}
            required
            defaultValue={selectedProfessional?.bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
          <input
            type='text'
            placeholder='Logradouro*'
            required
            defaultValue={selectedProfessional?.logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
          <input
            type='text'
            placeholder='Número*'
            defaultValue={selectedProfessional?.numero}
            required
            onChange={(e) => setNumero(e.target.value)}
          />

          {!userSelected && (
            <>
              <input
                type='text'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={selectedProfessional?.genero}
              />
              <select name='' id='' onChange={(e) => setGenero(e.target.value)}>
                <option hidden>Gênero</option>
                <option value='Mulher'>Mulher</option>
                <option value='Homem'>Homem</option>
                <option value='Prefiro não responder'>
                  Prefiro não responder
                </option>
              </select>
              <select
                name=''
                id=''
                onChange={(e) => setEstadoCivil(e.target.value)}
                defaultValue={selectedProfessional?.estadoCivil}
              >
                <option hidden>Estado civil</option>
                <option value='Solteiro(a)'>Solteiro(a)</option>
                <option value='Casado(a)'>Casado(a)</option>
                <option value='Viúvo(a)'>Viúvo(a)</option>
              </select>
            </>
          )}

          <label htmlFor="">Centro de custo</label>
          <select
            name=''
            id=''
            required
            defaultValue={selectedProfessional?.centroCustoId}
            onChange={(e) => setCentroCustoId(e.target.value)}
          >
            <option hidden>Centro de custo</option>
            {centroCustoList && centroCustoList.map(item => (
              <option key={item.id} value={item.id}>
                {item.nome} - {item.codigo}
              </option>
            ))}

          </select>

          <S.divCheck>
            <Checkbox
              type='checkbox'
              placeholder='Sub-Área?'
              defaultChecked={hasDependente}
              onChange={() => setHasDependente(!hasDependente)}
            />
            <S.Label htmlFor='subarea'>Possui dependentes?</S.Label>
          </S.divCheck>
          {hasDependente && (
            <>
              {dependentes.map((dependent, index) => (
                <div key={index} className='border'>
                  <input
                    type='text'
                    placeholder='Nome do Dependente'
                    name='nome'
                    onChange={(e) => handleChangeDependente(index, e)}
                    defaultValue={dependent.nome}
                  />
                  <InputMask
                    name='cpf'
                    mask='999.999.999-99'
                    placeholder='CPF do Dependente'
                    defaultValue={dependent.cpf}
                    onChange={(e) => {
                      handleChangeDependente(index, e)

                      const cpfWithLetters = e.target.value
                      const clearedCpf = cpfWithLetters.replace(/\D/g, '')

                      if (clearedCpf.length != 11) return

                      checkCPF(clearedCpf)
                    }}
                  />
                  <InputMask
                    name='rg'
                    mask='99.999.999-9'
                    placeholder='RG do Dependente'
                    onChange={(e) => handleChangeDependente(index, e)}
                    defaultValue={dependent.rg}
                  />
                  <input
                    name='dataNas'
                    type='date'
                    placeholder='Data de Nascimento do Dependente'
                    onChange={(e) => handleChangeDependente(index, e)}
                    defaultValue={dependent.dataNas}
                  />
                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => {
                      removeFormFields(index)
                      handleRemoveDependent(dependent?.id)
                    }}
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
              {/* <button
                type='button'
                className='btn-actions'
                onClick={() => addFormFields()}
                >
                  <FiPlus/>
                </button> */}
            </>
          )}

          {hasDependente && (
            <>
              {dependentesNew.map((dependent, index) => (
                <div key={index} className='border'>
                  <input
                    type='text'
                    placeholder='Nome do Dependente'
                    name='nome'
                    onChange={(e) => handleChangeDependenteNew(index, e)}
                  />
                  <InputMask
                    name='cpf'
                    mask='999.999.999-99'
                    placeholder='CPF do Dependente'
                    onChange={(e) => {
                      handleChangeDependenteNew(index, e)

                      const cpfWithLetters = e.target.value
                      const clearedCpf = cpfWithLetters.replace(/\D/g, '')

                      if (clearedCpf.length != 11) return

                      checkCPF(clearedCpf)
                    }}
                  />
                  <InputMask
                    name='rg'
                    mask='99.999.999-9'
                    placeholder='RG do Dependente'
                    onChange={(e) => handleChangeDependenteNew(index, e)}
                  />
                  <input
                    name='dataNas'
                    type='date'
                    placeholder='Data de Nascimento do Dependente'
                    onChange={(e) => handleChangeDependenteNew(index, e)}
                  />

                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => {
                      removeFormFieldsNew(index)
                    }}
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
              <button
                type='button'
                className='btn-actions btn-plus'
                onClick={() => addFormFieldsNew()}
              >
                <FiPlus />
              </button>
            </>
          )}
          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

      {/*
==========================================================================================================
                                                  CREATE
==========================================================================================================
*/}
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
            e.preventDefault()
            handleCreateProfessional()
          }}
        >
          <h2>Cadastrar profissional</h2>

          <h4>Selecione um profissional</h4>
          <select
            onChange={(e) => {
              const userIndex: number = parseInt(e.target.value)


              const newUserSelected = allUsers[userIndex]
              setUserSelected(newUserSelected)
              // (newUserSelected.fullName)
              setNome(newUserSelected.fullName)
              setEmail(newUserSelected.email)
            }}
            placeholder='Usuário Cadastrado'
          >
            <option hidden>Selecione usuário</option>

            {allUsers.map((user, i) => (
              <option key={i} value={i}>
                {user.fullName} | {user.email}
              </option>
            ))}
          </select>

          <label htmlFor="">Nome completo</label>
          <input
            type='text'
            defaultValue={userSelected?.fullName}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome'
          />

          <label htmlFor="">CPF</label>
          <InputMask
            // defaultValue={userSelected?.cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask='999.999.999-99'
            placeholder='Seu CPF'
            value={cpf}
          />

          <label htmlFor="">RG</label>
          <InputMask
            // defaultValue={userSelected?.rg}
            onChange={(e) => setRg(e.target.value)}
            mask='99.999.999-9'
            placeholder='Seu RG'
            value={rg}
          />

          <input
            type='text'
            defaultValue={userSelected?.descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
          />
          {/* <InputMask
            mask='99/99/9999'
            placeholder='Data de nascimento'
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          /> */}

          <label htmlFor="">Data de nascimento</label>
          <input
            type='date'
            placeholder='Data de nascimento'
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />


          <label htmlFor="">Nome da mãe</label>
          {/* These are not saved in user data */}
          <input
            type='text'
            placeholder='Nome da mãe'
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
          />

          <label htmlFor="">Seu telefone</label>
          <InputMask
            className='masked-input'
            type='text'
            name='phoneNumber'
            mask='(99) 99999-9999'
            placeholder='Telefone'
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label htmlFor="">Telefone 2</label>
          <InputMask
            className='masked-input'
            type='text'
            name='phoneNumber'
            mask='(99) 99999-9999'
            placeholder='Telefone 2'
            onChange={(e) => setTelefone2(e.target.value)}
          />
          {/*

          ISSO AQUI É UM SELECT COM OS DADOS DA TABLEA


          */}
          <label htmlFor="">Cargo</label>
          <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
            <option hidden>Cargo</option>
            {allPositions.map((position) => (
              <option key={position.id} value={position.id}>{position.nome}</option>
            ))}
          </select>


          <label htmlFor="">CEP</label>
          <InputMask
            onChange={(e) => setCep(e.target.value)}
            onBlur={(ev) => handleChangeCep(ev.target.value)}
            mask='99999-999'
            placeholder='CEP*'
            value={cep}
          />


          <label htmlFor="">Cidade</label>
          <input
            type='text'
            placeholder='Cidade*'
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <label htmlFor="">Bairro</label>
          <input
            type='text'
            placeholder='Bairro*'
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />

          <label htmlFor="">Logradouro</label>
          <input
            type='text'
            placeholder='Logradouro*'
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />

          <label htmlFor="">Número</label>
          <input
            type='number'
            placeholder='Número*'
            value={numero}
            onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
          />


          <label htmlFor="">Email</label>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Gênero</label>
          <select name='' id=''
            onChange={(e) => {
              setGenero(e.target.value)

            }
            }>
            <option hidden>Gênero</option>
            <option value='Mulher'>
              Mulher
            </option>
            <option value='Homem'>
              Homem
            </option>
            <option value='Prefiro não responder'>
              Prefiro não responder
            </option>
          </select>

          <label htmlFor="">Estado civil</label>
          <select
            name=''
            id=''
            onChange={(e) => setEstadoCivil(e.target.value)}
          >
            <option hidden>Estado civil</option>

            <option value='Solteiro(a)'>
              Solteiro(a)
            </option>

            <option value='Casado(a)'>
              Casado(a)
            </option>

            <option value='Viúvo(a)'>
              Viúvo(a)
            </option>

          </select>

          <label htmlFor="">Centro de custo</label>
          <select
            name=''
            id=''
            required
            onChange={(e) => setCentroCustoId(e.target.value)}
          >
            <option hidden>Centro de custo</option>
            {centroCustoList && centroCustoList.map(item => (
              <option key={item.id} value={item.id}>
                {item.nome} - {item.codigo}
              </option>
            ))}

          </select>

          <S.divCheck>
            <Checkbox
              type='checkbox'
              placeholder='Sub-Área?'
              defaultChecked={hasDependente}
              onChange={() => setHasDependente(!hasDependente)}
            />
            <S.Label htmlFor='subarea'>Possui dependentes?</S.Label>
          </S.divCheck>
          {hasDependente && (
            <>
              {dependentes.map((e, index) => (
                <div key={index} className='border'>
                  <label htmlFor="">Nome do Dependente</label>
                  <input
                    type='text'
                    placeholder='Nome do Dependente'
                    name='nome'
                    onChange={(e) => handleChangeDependente(index, e)}
                  />

                  <label htmlFor="">CPF do Dependente</label>
                  <InputMask
                    name='cpf'
                    mask='999.999.999-99'
                    placeholder='CPF do Dependente'
                    onChange={(e) => {
                      handleChangeDependente(index, e)

                      const cpfWithLetters = e.target.value
                      const clearedCpf = cpfWithLetters.replace(/\D/g, '')

                      if (clearedCpf.length != 11) return

                      checkCPF(clearedCpf)
                    }}
                  />

                  <label htmlFor="">RG do dependente</label>
                  <InputMask
                    name='rg'
                    mask='99.999.999-9'
                    placeholder='RG do Dependente'
                    onChange={(e) => handleChangeDependente(index, e)}
                  />

                  <label htmlFor="">Data de Nascimento do Dependente</label>
                  <div className="return">
                    <input
                      name='dataNas'
                      type='date'
                      placeholder='Data de Nascimento do Dependente'
                      onChange={(e) => handleChangeDependente(index, e)}
                    />
                    <button
                      className='btn-actions btn-trash'
                      type='button'
                      onClick={() => removeFormFields(index)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type='button'
                className='btn-actions btn-plus'
                onClick={() => addFormFields()}
              >
                <FiPlus />
              </button>
            </>
          )}

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
            handleFilterProfessionals()
          }}
        >
          <h2>Filtros</h2>




          <label htmlFor="">Nome completo</label>
          <input
            type='text'
            defaultValue={userSelected?.fullName}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome'
          />

          <label htmlFor="">CPF</label>
          <InputMask
            onChange={(e) => setCpf(e.target.value)}
            mask='999.999.999-99'
            placeholder='Seu CPF'
            value={cpf}
          />

          <label htmlFor="">RG</label>
          <InputMask
            onChange={(e) => setRg(e.target.value)}
            mask='99.999.999-9'
            placeholder='Seu RG'
            value={rg}
          />

          <label htmlFor="">Data de nascimento</label>
          <input
            type='date'
            placeholder='Data de nascimento'
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />


          <label htmlFor="">Nome da mãe</label>
          <input
            type='text'
            placeholder='Nome da mãe'
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
          />

          <label htmlFor="">Cargo</label>
          <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
            <option hidden>Cargo</option>
            {allPositions.map((position) => (
              <option key={position.id} value={position.id}>{position.nome}</option>
            ))}
          </select>


          <label htmlFor="">CEP</label>
          <InputMask
            onChange={(e) => setCep(e.target.value)}
            onBlur={(ev) => handleChangeCep(ev.target.value)}
            mask='99999-999'
            placeholder='CEP*'
            value={cep}
          />


          <label htmlFor="">Cidade</label>
          <input
            type='text'
            placeholder='Cidade*'
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <label htmlFor="">Bairro</label>
          <input
            type='text'
            placeholder='Bairro*'
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
