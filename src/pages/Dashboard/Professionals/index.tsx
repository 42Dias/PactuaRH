import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Professionals.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import user from 'service/user/user'
import profissional from 'service/profissional/profissional'
import cepInformation from 'utils/cepInformation'
import { fullName } from 'service/api'
import { Checkbox } from '../Area/Area.styled'

export default function Professionals() {
  const [modalIsOpenNew, setIsOpenNew   ] = useState(false)
  const [modalIsOpen  , setIsOpen       ] = useState(false)
  const [allUsers     , setAllUsers     ] = useState<any[]>([])
  const [userSelected , setUserSelected ] = useState<any>()

  const [email        , setEmail        ] = useState<string>('')
  const [nascimento   , setNascimento   ] = useState<string>('')
  const [genero       , setGenero       ] = useState<string>('')
  const [estado       , setEstado       ] = useState<string>('')
  const [nome         , setNome         ] = useState<string>('')
  const [rg           , setRg           ] = useState<string>('')
  const [cpf          , setCpf          ] = useState<string>('')
  const [nomeMae      , setNomeMae      ] = useState<string>('')
  const [beneficios   , setBeneficios   ] = useState<string>('')
  const [cargo        , setCargo        ] = useState<string>('')
  const [cep          , setCep          ] = useState<string>('')
  const [logradouro   , setLogradouro   ] = useState<string>('')
  const [bairro       , setBairro       ] = useState<string>('')
  const [cidade       , setCidade       ] = useState<string>('')
  const [estadoCivil  , setEstadoCivil  ] = useState<string>('')
  const [dependenteCpf, setdependenteCpf] = useState<string>('')
  const [dependenteRg , setdependenteRg ] = useState<string>('')
  const [hasDependente, setHasDependente] = useState<boolean>(false)
  const [dependenteNome, setDependenteNome] = useState<string>('')
  
  const [index, setIndex] = useState<number>(0)

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

  async function getUsers() {
    const users = await user.list()

    console.log('users')
    console.log(users)

    setAllUsers(users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  async function handleChangeCep(cepText: string) {
    const cep = cepText.replace(/[^0-9]/g, '')

    console.log('cep')
    console.log(cep)

    if (cep.length == 8) {
      const data = await cepInformation(cep)
      console.log(data)
      setCep(data.cep)
      setLogradouro(data.logradouro)
      setBairro(data.bairro)
      setCidade(data.localidade)
      setEstado(data.uf)
    }
  }

  async function handleCreateProfessional() {
    let createdUser

    if (!userSelected) {
      // if no user is selected it creates one with that data and use it to create the professional register
      const data = {
        emails: [email],
        roles: ['user'],
        email: email,
        fullName: nome,
        firstName: nome.split(' ')[0],
        estadoCivilcivil: estadoCivil,
        aniversario: nascimento,
        cpf: cpf,
        rg: rg,
        gender: genero,
      }

      console.log('data')
      console.log(data)

      createdUser = await user.createByEmpresa(data)

      if (!createdUser) return
    }

    const data = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      userId: userSelected.id || createdUser.id,
      dataNasc: nascimento,
      nomeMae: nomeMae,
      cep: cep,
      estadoCivil: estadoCivil,
      // cidade     : userSelected.fullname,
      // bairro     : userSelected.fullname,
      // logradouro : userSelected.fullname,
      // numero     : userSelected.fullname,
      // complemento: userSelected.fullname,
      // telefone1  : userSelected.fullname,
      // telefone2  : userSelected.fullname,
      // email      : userSelected.fullname,
      // importHash : userSelected.fullname,
    }

    const isCreated = await profissional.create(data)

    console.log(isCreated)

    closeModalNew()
  }

  console.log(userSelected?.cpf)

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
              <td>Nome</td>
              <td>CPF</td>
              <td>RG</td>
              <td>Cargo</td>
            </S.TrTitle>
            <S.TrSecond>
              <td>Ryan</td>
              <td>049.253.142-45</td>
              <td>55.432.123-9</td>
              <td>Full Stack</td>
              <td>
                <button onClick={openModal}>
                  <FiEdit size={18} />
                </button>
              </td>
              <td>
                <button>
                  <FiTrash size={18} />
                </button>
              </td>
            </S.TrSecond>
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

        <S.ContainerForm>
          <h2>Editar profissional</h2>

          <input type='text' placeholder='Nome' />
          <input type='number' placeholder='CPF' />
          <input type='number' placeholder='RG' />
          <input type='number' placeholder='Data de nascimento' />
          <input type='text' placeholder='Nome da mãe' />
          <input type='text' placeholder='Cargo' />
          <input type='text' placeholder='Benefícios' />
          <input type='text' placeholder='CEP*' />
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
            e.preventDefault
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
              }

              const newUserSelected = allUsers[userIndex]

              setUserSelected(newUserSelected)

              // Sets the setState values 'cause defaultValue does not work
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

          <input
            type='text'
            defaultValue={userSelected?.fullName}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome'
          />

          <InputMask
            // defaultValue={userSelected?.cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask='999.999.999-99'
            placeholder='Seu CPF'
            value={cpf}
          />
          <InputMask
            // defaultValue={userSelected?.rg}
            onChange={(e) => setRg(e.target.value)}
            mask='99.999.999-9'
            placeholder='Seu RG'
            value={rg}
          />

          <InputMask
            mask='99/99/9999'
            placeholder='Data de nascimento'
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />

          {/* These are not saved in user data */}
          <input
            type='text'
            placeholder='Nome da mãe'
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
          />

          <input
            type='text'
            placeholder='Cargo'
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />

          <input
            type='text'
            placeholder='Benefícios'
            value={beneficios}
            onChange={(e) => setBeneficios(e.target.value)}
          />

          <input
            type='text'
            placeholder='CEP*'
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={(ev) => handleChangeCep(ev.target.value)}
          />

          <input
            type='text'
            placeholder='Logradouro*'
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />

          <input
            type='text'
            placeholder='Bairro*'
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />

          <input
            type='text'
            placeholder='Cidade*'
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <S.divCheck>
            <Checkbox
              type='checkbox'
              placeholder='Sub-Área?'
              defaultChecked={hasDependente}
              onChange={() => setHasDependente(!hasDependente) }
            />
            <S.Label htmlFor='subarea'>Possui dependentes?</S.Label>

          </S.divCheck>

          {hasDependente && (
              <>
                <input
                  type='text'
                  placeholder='Cpf do Dependente '
                  value={dependenteCpf}
                  onChange={(e) => setCidade(e.target.value)}
                />

              <input
                  type='text'
                  placeholder='Rg do Dependente*'
                  value={dependenteRg}
                  onChange={(e) => setCidade(e.target.value)}
                />
                
                <input
                  type='text'
                  placeholder='Nome do Dependente'
                  value={dependenteNome}
                  onChange={(e) => setDependenteNome(e.target.value)}
                />              
              </>
          )}

          

          {!userSelected && (
            <>
              <input
                type='text'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
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
              >
                <option hidden>Estado civil</option>
                <option value='Solteiro(a)'>Solteiro(a)</option>
                <option value='Casado(a)'>Casado(a)</option>
                <option value='Viúvo(a)'>Viúvo(a)</option>
              </select>
            </>
          )}

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
