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


export default function Professionals() {
  interface iDependent {
    id?: string
    nome: string
    cpf: string
    rg: string
    dataNas: string
  }
  const [profissionals, setProfissionals] = useState<any[]>([])

  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)

  const [allUsers, setAllUsers] = useState<any[]>([])
  const [userSelected, setUserSelected] = useState<any>()
  const [selectedProfessional, setSelectedProfessional] = useState<any>()

  const [id, setId] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [nascimento, setNascimento] = useState<string>('')
  const [genero, setGenero] = useState<string>('')
  const [estado, setEstado] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [rg, setRg] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [nomeMae, setNomeMae] = useState<string>('')
  const [beneficios, setBeneficios] = useState<string>('')
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
  const [dependentes, setDependentes] = useState<iDependent[]>([
    { nome: '', cpf: '', rg: '', dataNas: '' },
  ])
  const [dependentesNew, setDependentesNew] = useState<iDependent[]>([])
  // const [dependentesNew, setDependentesNew  ] = useState<iDependent[]>([ { nome: '', cpf: '', rg: '', dataNas: '' } ])

  const [allPositions, setAllPositions] = useState<iCargo[]>([])

  const [dependentsToDelete, setDependentsToDelete] = useState<iDependent[]>([])
  const [index, setIndex] = useState<number>(0)

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
    setHasDependente(false)
    setDependentes([{ nome: '', cpf: '', rg: '', dataNas: '' }])
    setDependentesNew([{ nome: '', cpf: '', rg: '', dataNas: '' }])
  }

  function openModalNew() {
    setHasDependente(false)
    setIsOpenNew(true)
    setDependentes([{ nome: '', cpf: '', rg: '', dataNas: '' }])
  }

  function closeModalNew() {
    setIsOpenNew(false)
  }

  async function handleChangeCep(cepText: string) {
    const cep = cepText.replace(/[^0-9]/g, '')

    // console.log('cep')
    // console.log(cep)

    if (cep.length == 8) {
      const data = await cepInformation(cep)
      // console.log(data)
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
  }
  async function handleCreateProfessional() {
    let createdUser

    if (!userSelected) {
      // if no user is selected it creates one with that data and use it to create the professional register
      const data = {
        emails: [email],
        roles: ['user'],
        email: email,
        descricao: descricao,
        fullName: nome,
        firstName: nome.split(' ')[0],
        estadoCivilcivil: estadoCivil,
        aniversario: nascimento,
        cpf: cpf,
        rg: rg,
        gender: genero,
      }
      createdUser = await user.createByEmpresa(data)

      if (!createdUser) return
    }

    if (userSelected) setEmail(userSelected.email)

    const data = {
      nome: nome || userSelected?.fullname,
      cpf: cpf,
      rg: rg,
      descricao: descricao,
      userId: '',
      dataNas: nascimento,
      nomeMae: nomeMae,
      cep: cep,
      estadoCivil: estadoCivil,
      email: email,
      cidade: cidade,
      bairro: bairro,
      logradouro: logradouro,
      numero: numero,
      telefone1: telefone,
      telefone2: telefone2,
      // complemento: complemento,
      dependentes: dependentes,
      cargo: cargo,
    }
    if (userSelected) data.userId = userSelected.id
    if (createdUser) data.userId = createdUser.id
    // console.log("data")
    // console.log(data)

    const isCreated = await profissional.create(data)

    // console.log(isCreated)

    handleLoadProfessionals()

    closeModalNew()
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
      dataNas: nascimento || selectedProfessional?.dataNas,
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
      dependentes: dependentes || selectedProfessional?.dependentes,
      cargo: cargo || selectedProfessional?.cargo.id,
      dependentesNew: dependentesNew,
    }
    const isUpdated = await profissional.update(id, data)

    // console.log(isUpdated)

    handleLoadProfessionals()

    closeModal()
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

    // console.log(newFormValues)
    setDependentes(newFormValues)
  }

  const removeFormFields = (i: number) => {
    // console.log(dependentes[i])
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
    // console.log("bndjflnbdfknbdfnbjdfnbkjdfnbkjv,klmbojdfnfioudenbafo")
    const newFormValues = [...dependentesNew]

    // @ts-ignore
    // console.log(newFormValues[i])

    // @ts-ignore
    // console.log(newFormValues[i])

    // @ts-ignore
    // console.log(e.target.name)

    // @ts-ignore
    // console.log(newFormValues[i][e.target.name])

    // @ts-ignore
    // console.log(e.target.value)

    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value

    // console.log(newFormValues)
    setDependentesNew(newFormValues)
  }

  const removeFormFieldsNew = (i: number) => {
    // console.log(dependentesNew[i])
    const newFormValues = [...dependentesNew]
    newFormValues.splice(i, 1)
    setDependentesNew(newFormValues)
  }

  // ============================== Handle SubCruds
  async function handleLoadPosition() {
    const cargo = await cargos.list()

    // console.log('cargos')
    // console.log(cargo)

    setAllPositions(cargo)
  }
  async function getUsers() {
    const users = await user.list()

    // console.log('users')
    // console.log(users)

    setAllUsers(users)
  }
  // ============================== Handle Subcrud Dependents
  async function handleRemoveDependent(id?: string) {
    await dependente.delete(id)
  } // ============================== UseEffects

  useEffect(() => {
    handleLoadPosition()
  }, [])

  useEffect(() => {
    getUsers()
  }, [])
  useEffect(() => {
    handleLoadProfessionals()
  }, [])
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
              table="benefits"
              filename="Pactua Benefícios Excel"
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
              <td>Descrição</td>
            </S.TrTitle>
            {profissionals.map((value: any, index) => (
              <S.TrSecond key={index}>
                <td>{value.nome}</td>
                <td>{value.cpf}</td>
                <td>{value.rg}</td>
                <td>{value.cargo.nome}</td>
                <td>{value.descricao}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(value.id)
                      setSelectedProfessional(value)
                      // console.log(value)
                      setHasDependente(value.dependente.length >= 1)
                      setDependentes(value.dependente)
                      setCargo(value.cargo.id)
                      // console.log("value.cargo.id")
                      // console.log(value.cargo.id)

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
              <option value={position.id}>{position.nome}</option>
            ))}
          </select>

          <input
            type='text'
            placeholder='CEP*'
            // value={cep}
            required
            defaultValue={selectedProfessional?.cep}
            onChange={(e) => {
              setCep(e.target.value)
            }}
            onBlur={(ev) => handleChangeCep(ev.target.value)}
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
                <div className='border'>
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

                      // console.log(clearedCpf)
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
                <div className='border'>
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

                      // console.log(clearedCpf)
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
                className='btn-actions'
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

              // if the index is selected as new it clears the present data
              if (isNaN(userIndex)) {
                setUserSelected({})
                setCpf('')
                setRg('')
                setNascimento('')
                setNome('')
              }

              const newUserSelected = allUsers[userIndex]
              setUserSelected(newUserSelected)

              // Sets the setState values 'cause defaultValue does not work
              // console.log("newUserSelected.fullName")
              // console.log(newUserSelected.fullName)
              setNome(newUserSelected.fullName)
              setCpf(newUserSelected.cpf)
              setRg(newUserSelected.rg)
              setNascimento(newUserSelected.aniversario)
            }}
            placeholder='Usuário Cadastrado'
          >
            <option value={''}>Novo</option>

            {allUsers.map((user, i) => (
              <option value={i}>
                {user.fullName} | {user.cpf}
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
              <option value={position.id}>{position.nome}</option>
            ))}
          </select>

          {/* This is not necesssary anymore */}
          {/*
          <input
            type='text'
            placeholder='Benefícios'
            value={beneficios}
            onChange={(e) => setBeneficios(e.target.value)}
          />
          */}

          <label htmlFor="">CEP</label>
          <input
            type='text'
            placeholder='CEP*'
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={(ev) => handleChangeCep(ev.target.value)}
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
            type='text'
            placeholder='Número*'
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />


          {!userSelected && (
            <>
              <label htmlFor="">Email</label>
              <input
                type='text'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">Gênero</label>
              <select name='' id='' onChange={(e) => setGenero(e.target.value)}>
                <option hidden>Gênero</option>
                <option value='Mulher'>Mulher</option>
                <option value='Homem'>Homem</option>
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
                <option value='Solteiro(a)'>Solteiro(a)</option>
                <option value='Casado(a)'>Casado(a)</option>
                <option value='Viúvo(a)'>Viúvo(a)</option>
              </select>
            </>
          )}

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
                <div className='border'>
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

                      // console.log(clearedCpf)
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
              ))}
              <button
                type='button'
                className='btn-actions'
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
            handleCreateProfessional()
          }}
        >
          <h2>Filtros</h2>

          <h4>Selecione um profissional</h4>
          <select
            onChange={(e) => {
              const userIndex: number = parseInt(e.target.value)

              // if the index is selected as new it clears the present data
              if (isNaN(userIndex)) {
                setUserSelected({})
                setCpf('')
                setRg('')
                setNascimento('')
                setNome('')
              }

              const newUserSelected = allUsers[userIndex]
              setUserSelected(newUserSelected)

              // Sets the setState values 'cause defaultValue does not work
              // console.log("newUserSelected.fullName")
              // console.log(newUserSelected.fullName)
              setNome(newUserSelected.fullName)
              setCpf(newUserSelected.cpf)
              setRg(newUserSelected.rg)
              setNascimento(newUserSelected.aniversario)
            }}
            placeholder='Usuário Cadastrado'
          >
            <option value={''}>Novo</option>

            {allUsers.map((user, i) => (
              <option value={i}>
                {user.fullName} | {user.cpf}
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
              <option value={position.id}>{position.nome}</option>
            ))}
          </select>

          {/* This is not necesssary anymore */}
          {/*
          <input
            type='text'
            placeholder='Benefícios'
            value={beneficios}
            onChange={(e) => setBeneficios(e.target.value)}
          />
          */}

          <label htmlFor="">CEP</label>
          <input
            type='text'
            placeholder='CEP*'
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={(ev) => handleChangeCep(ev.target.value)}
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
            type='text'
            placeholder='Número*'
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />


          {!userSelected && (
            <>
              <label htmlFor="">Email</label>
              <input
                type='text'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">Gênero</label>
              <select name='' id='' onChange={(e) => setGenero(e.target.value)}>
                <option hidden>Gênero</option>
                <option value='Mulher'>Mulher</option>
                <option value='Homem'>Homem</option>
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
                <option value='Solteiro(a)'>Solteiro(a)</option>
                <option value='Casado(a)'>Casado(a)</option>
                <option value='Viúvo(a)'>Viúvo(a)</option>
              </select>
            </>
          )}

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
                <div className='border'>
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

                      // console.log(clearedCpf)
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
              ))}
              <button
                type='button'
                className='btn-actions'
                onClick={() => addFormFields()}
              >
                <FiPlus />
              </button>
            </>
          )}

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
