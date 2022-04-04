import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Professionals.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import user from 'service/user/user'

export default function Professionals() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [allUsers  , setAllUsers  ] = useState<any[]>([])
  const [userSelected  , setUserSelected  ] = useState<any>()

  const [email     , setEmail     ] = useState<string>("")
  const [nascimento, setNascimento] = useState<string>("")
  const [genero    , setGenero    ] = useState<string>("")
  const [estado    , setEstado    ] = useState<string>("")
  const [index     , setIndex     ] = useState<number>(0)


  const [rg        , setRg] = useState<string>("")
  const [cpf       , setCpf] = useState<string>("")
  const [nomeMae   , setNomeMae] = useState<string>("")
  const [beneficios, setbeneficios] = useState<string>("")
  const [cargo     , setCargo] = useState<string>("")
  const [cep       , setCep] = useState<string>("")  

  
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


  async function handleCreateProfessional(){
    
  }


  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, Luciano 😁</S.Container>
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
        onSubmit={e => {
          e.preventDefault
          handleCreateProfessional()
        }}
        >
          <h2>Cadastrar profissional</h2>

          <h4>Selecione um profissional</h4>
          <select
          
          onChange={
            e => {
              console.log(e.target.value)

              let userIndex: number = parseInt(e.target.value)

              setUserSelected(allUsers[userIndex])

              console.log(allUsers[userIndex])
            }
          }
          
          placeholder='Usuário Cadastrado' >
            <option value={""}>
              Novo
            </option>

            {
              allUsers.map(
                (user, i)  =>
                (
                  <option
                  value={i}
                  >
                    {user.fullName} | {user.cpf}
                  </option>
                )
              )}
              
          </select>

          <input
            type='text'
            defaultValue={userSelected?.fullName}
            placeholder='Nome' />

        <InputMask
          defaultValue={userSelected?.cpf}
          onChange={(e) =>  setCpf(e.target.value)}
          mask='999.999.999-99' placeholder='Seu CPF'
        />
        <InputMask
          defaultValue={userSelected?.rg}
          onChange={(e) =>  setRg(e.target.value)}
          mask='99.999.999-9' placeholder='Seu RG' 
        />





          <input
            type='number'
            defaultValue={userSelected?.datanascimento}
            placeholder='Data de nascimento' />
          <input
            type='text'
            defaultValue={userSelected?.Nome}
            placeholder='Nome da mãe' />
          <input
            type='text'
            defaultValue={userSelected?.Cargo}
            placeholder='Cargo' />
          <input
            type='text'
            defaultValue={userSelected?.Benefícios}
            placeholder='Benefícios' />
          <input
            type='text'
            defaultValue={userSelected?.CEP}
            placeholder='CEP*' />

          {
          !userSelected && (
          <>
            <input
                type='text'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} /><select
                  name=''
                  id=''
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option hidden>Gênero</option>
                  <option value='Mulher'>Mulher</option>
                  <option value='Homem'>Homem</option>
                  <option value='Prefiro não responder'>Prefiro não responder</option>
                </select><select
                  name=''
                  id=''
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option hidden>Estado civil</option>
                  <option value='Solteiro(a)'>Solteiro(a)</option>
                  <option value='Casado(a)'>Casado(a)</option>
                  <option value='Viúvo(a)'>Viúvo(a)</option>
                </select>
                
          </>
          )
          }

          <button
          type='submit'
          >Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
