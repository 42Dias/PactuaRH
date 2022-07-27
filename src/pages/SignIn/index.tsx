import { useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'

import { SubmitButton } from 'ui/components/SubmitButton'
import { TextField } from 'ui/components/TextField'
import { login, logocor } from 'assets'

import * as S from './SignIn.styled'
import user from 'service/user/user'
import { token } from 'service/api'

type FormData = {
  email: string
  password: string
}

export default function SignIn() {

  const [textPass, setTextPass] = useState(true)
  const [passwordErr, setPasswordErr] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {

    const canLogin = await user.login(data.email, data.password)


    if (!canLogin) {
      setPasswordErr(true)
      return
    }

    navigate('/dashboard', {})

  }

  function checkIfIsLogged() {
    if (token) window.location.pathname = '/dashboard'
  }

  useLayoutEffect(
    () => {
      checkIfIsLogged()
    }, []
  )

  return (
    <S.Container>
      <img src={login} alt='image sign in' />

      <S.Content>
        <img className='logo' src={logocor} alt='image sign in' />

        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='E-mail'
            id='email'
            type='email'
            errorMessage={errors.email?.message}
            placeholder='examplo@gmail.com'
            {...register('email', {
              required: {
                value: true,
                message: 'Todos os campos são obrigatórios',
              },
            })}
          />

          <S.Password>
            <TextField
              label='Senha'
              id='password'
              placeholder='sua melhor senha'
              type={textPass ? 'password' : 'text'}
              {...register('password', {
                required: true,
              })}
            />

            <button onClick={() => setTextPass(!textPass)} type='button'>
              <FiEye size={20} />
            </button>
          </S.Password>


          <SubmitButton className='btn' />
        </form>
        {passwordErr && <Link to='/passwordrecovery'>Esqueceu a senha ?</Link>}
        <Link to='/cadastro'>Cadastre-se</Link>
      </S.Content>
    </S.Container>
  )
}
