import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './UserRegistration.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { Link } from 'react-router-dom'
import user from 'service/user/user'
import { fullName, id } from 'service/api'
// import { randomUUID } from 'crypto'

export default function UserRegistration() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)

  const [nome, setNome] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [nascimento, setNascimento] = useState<string>('')
  const [genero, setGenero] = useState<string>('')
  const [estado, setEstado] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [rg, setRg] = useState<string>('')
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [userEdit, setUserEdit] = useState<any>({})

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

  async function createUser() {
    const data = {
      emails: [email],
      roles: ['user'],
      email: email,
      fullName: nome,
      firstName: nome.split(' ')[0],
      estadocivil: estado,
      aniversario: nascimento,
      cpf: cpf,
      rg: rg,
      gender: genero,
    }

    console.log('data')
    console.log(data)

    const isCreated = await user.createByEmpresa(data)

    if (!isCreated) return

    closeModalNew()
    await getUsers()
  }

  async function updateUser(id: string) {
    const data = {
      fullName: nome,
      firstName: nome.split(' ')[0],
      estadocivil: estado,
      aniversario: nascimento,
      cpf: cpf,
      rg: rg,
      gender: genero,
    }

    const updatedUser = await user.update(id, data)

    if (updatedUser) closeModal()

    await getUsers()
  }

  async function deleteUser(id: string) {
    await user.delete(id)

    await getUsers()
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
            {/* This button toggles a modal to create a newUser */}
            <button onClick={openModalNew}>
              Novo <FiPlus size={18} color='#fff' />
            </button>
            {/* Is it necessary? */}
            <Link to='/status-de-usuario'>
              Status <FiEye size={18} color='#fff' />
            </Link>
          </S.FlexButtons>

          <S.Table>
            <S.TrTitle>
              <td>Nome</td>
              <td>Gênero</td>
              <td>CPF</td>
              <td>RG</td>
            </S.TrTitle>

            {allUsers.map((user) => (
              <S.TrSecond>
                <td>{user.fullName || 'Não cadastrado'}</td>
                <td>{user.gender || 'Não cadastrado'}</td>
                <td>{user.cpf || 'Não cadastrado'}</td>
                <td>{user.rg || 'Não cadastrado'}</td>
                <td>
                  {/* Edits this user data */}
                  <button
                    onClick={() => {
                      setUserEdit(user)
                      openModal()
                    }}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>
                    <FiTrash size={18} />
                  </button>
                </td>
              </S.TrSecond>
            ))}
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
          onSubmit={(e: any) => {
            e.preventDefault()
            // e.target.reset()
            updateUser(userEdit.id)
          }}
        >
          <h2>Editar usuário</h2>

          <input
            type='text'
            defaultValue={userEdit?.fullName}
            onChange={(e) => setNome(e.target.value)}
          />

          <select
            name=''
            id=''
            defaultValue={userEdit?.gender}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value='Homem'>Homem</option>
            <option value='Mulher'>Mulher</option>
            <option value='Prefiro não responder'>Prefiro não responder</option>
          </select>

          <InputMask
            defaultValue={userEdit?.cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask='999.999.999-99'
            placeholder='Seu CPF'
          />
          <InputMask
            defaultValue={userEdit?.rg}
            onChange={(e) => setRg(e.target.value)}
            mask='99.999.999-9'
            placeholder='Seu RG'
          />

          <button type='submit'>Enviiaar</button>
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
          onSubmit={(e: any) => {
            e.preventDefault()
            // e.target.reset()
            createUser()
          }}
        >
          <h2>Novo usuário</h2>

          <input
            type='text'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='text'
            placeholder='Seu nome completo'
            onChange={(e) => setNome(e.target.value)}
          />

          <InputMask
            mask='99/99/9999'
            placeholder='Data de nascimento'
            onChange={(e) => setNascimento(e.target.value)}
          />

          <select name='' id='' onChange={(e) => setGenero(e.target.value)}>
            <option hidden>Gênero</option>
            <option value='Mulher'>Mulher</option>
            <option value='Homem'>Homem</option>
            <option value='Prefiro não responder'>Prefiro não responder</option>
          </select>

          <select name='' id='' onChange={(e) => setEstado(e.target.value)}>
            <option hidden>Estado civil</option>
            <option value='Solteiro(a)'>Solteiro(a)</option>
            <option value='Casado(a)'>Casado(a)</option>
            <option value='Viúvo(a)'>Viúvo(a)</option>
          </select>

          <InputMask
            onChange={(e) => setCpf(e.target.value)}
            mask='999.999.999-99'
            placeholder='CPF'
          />
          <InputMask
            onChange={(e) => setRg(e.target.value)}
            mask='99.999.999-9'
            placeholder='RG'
          />

          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
