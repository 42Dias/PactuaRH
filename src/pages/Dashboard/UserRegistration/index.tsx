import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './UserRegistration.styled'
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { Link } from 'react-router-dom'
import user from 'service/user/user'
import { fullName, id } from 'service/api'
// import { randomUUID } from 'crypto'
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import fakeapi from 'service/fake-api'

interface IRyan {
  id:number;
  name:string;
  price:number;
  available: boolean;
  image: string;
}

export default function UserRegistration() {

  const [ryan, setRyan] = useState<IRyan[]>([]);

  useEffect(() => {
    async function getRyan() {
      const response = await fakeapi.get('/ryan');
      setRyan(response.data);
      console.log(response.data);
    }
    getRyan()
  }, [])

  const roles = [
    {
      value: "user",
      nome:  "Usuário"
    },
    {
      value: "admin",
      nome:  "Administrador"
    },
    {
      value: "empresa",
      nome:  "Empresa"
    },
  ]

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)

  const [nome      , setNome      ] = useState<string>("")
  const [email     , setEmail     ] = useState<string>("")
  const [role      , setRole      ] = useState<string>("")
  const [allUsers  , setAllUsers  ] = useState<any[]>([])
  const [userEdit  , setUserEdit  ] = useState<any>({})

  
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
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
  }

  async function getUsers(){
    let users = await user.list()

    console.log("users")
    console.log(users)

    setAllUsers(users)
  }

  useEffect(
    () => {
      getUsers()
    }, []
  )

  async function createUser(){
    let data = {
      emails: [ email ],
      roles:  [ role  ],
      email: email,
      fullName: nome,
      firstName:  nome.split(' ')[0],
    }

    console.log("data")
    console.log(data)

    let isCreated = await user.createByEmpresa(data)


    if(!isCreated) return ;
    
    closeModalNew()
    await getUsers()
  }

  async function updateUser(id: string){
    let data = {
      fullName: nome,
      firstName:  nome.split(' ')[0],
    }

    let updatedUser = await user.update(id, data)

    if(updatedUser) closeModal()

    await getUsers()
  }

  async function deleteUser(id: string){

    await user.delete(id)


    await getUsers()
  }

  function showUserRole(role: string){
    switch(role){
      case 'user'    : 
       return 'Usuário'
        
      case 'admin'   : 
       return 'Administrador'
        
      case 'empresa' : 
       return 'Empresa'
        
    }

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

              <Link to='/status-de-usuario'>
                Status <FiEye size={18} color='#fff' />
              </Link>
            </div>

            <ReactHTMLTableToExcel
              table="benefits"
              filename="Pactua Benefícios Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
            
          </S.FlexButtons>

          <S.Table id="usuario">
            <S.TrTitle>
              <td>Nome</td>
              <td>Email</td>
              <td>Role</td>
              <td>Role</td>
            </S.TrTitle>

            {
              ryan.map(
                (ryans) => (
                  <S.TrSecond>
                    <td>
                      {ryans.id || "Não cadastrado"}
                    </td>
                    <td>
                      {ryans.name || "sem nome"}
                    </td>
                    <td>
                      {ryans.price || "sem nome"}
                    </td>
                    <td>
                      {ryans.available || "sem nome"}
                    </td>
                    <img src={ryans.image} alt="" />
                  </S.TrSecond>
                )
              )
            }

          </S.Table>

          <S.Table id="usuario">
            <S.TrTitle>
              <td>Nome</td>
              <td>Email</td>
              <td>Role</td>
            </S.TrTitle>

            {
            allUsers.map(
              (user) => (
                <S.TrSecond>
                  <td>
                    {user.fullName || "Não cadastrado"}
                  </td>
                  <td>
                    {user.email    || "Não cadastrado"}
                  </td>
              <td>
                { showUserRole(user.tenants[0].roles[0])   || "Não cadastrado" }
              </td>
              <td>
                {/* Edits this user data */}
                <button
                  onClick={
                  () => {

                    setUserEdit(user)
                    openModal()

                  }
                  }>
                  <FiEdit size={18} />
                </button>
              </td>
              <td>
                <button
                onClick={() => deleteUser(user.id)}
                >
                  <FiTrash size={18} />
                </button>
              </td>
            </S.TrSecond>
              )
            )
            }

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
          // e.target.reset()
          updateUser(userEdit.id)
         }
        }
        >
          <h2>Editar usuário</h2>

          <input
          type='text'
          defaultValue={userEdit?.fullName}
          onChange={(e) =>  setNome(e.target.value)}
          />

          

        <button
          type='submit'
          >
            Enviar
        </button>

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
          onSubmit={
            (e: any) => {
            e.preventDefault()
            // e.target.reset()
            createUser()
            }
          }
        >
          <h2>Novo usuário</h2>

          <label htmlFor="">Seu nome completo</label>
          <input
            type='text'
            placeholder='Seu nome completo'
            onChange={(e) =>  setNome(e.target.value)}
          />


          <label htmlFor="">Email</label>
          <input
            type='text'
            placeholder='Email'
            onChange={(e) =>  setEmail(e.target.value)}
          />


          <label htmlFor="">Role</label>
          <select
          name="role"
          id="role"
          onChange={e => setRole(e.target.value)}
          >
            <option hidden> Selecione </option>
            {
              roles.map(
                (role) => (
                  <option value={role.value}>
                    {
                      role.nome
                    }
                  </option>
                )
              )
            }
          </select>

          

          <button
          type='submit'
          >
            Enviar
          </button>
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
          onSubmit={
            (e: any) => {
            e.preventDefault()
            // e.target.reset()
            createUser()
            }
          }
        >
          <h2>Filtros</h2>

          <label htmlFor="">Email</label>
          <input
            type='text'
            placeholder='Email'
            onChange={(e) =>  setEmail(e.target.value)}
          />

          <label htmlFor="">Seu nome completo</label>
          <input
            type='text'
            placeholder='Seu nome completo'
            onChange={(e) =>  setNome(e.target.value)}
          />

          

          <button
          type='submit'
          >
            Enviar
          </button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
