import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'

import { SubmitButton } from 'ui/components/SubmitButton'
import { TextField } from 'ui/components/TextField'
import { login } from 'assets'

import * as S from './SignUp.styled'

type FormData = {
  name: string
  email: string
  password: string
  enter_as: string
  terms: string
}

export default function SignUp() {
  const [textPass, setTextPass] = useState(true)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function onSubmit(data: FormData) {
    console.log(data)

    navigate('/dashboard', { replace: true })
  }

  return (
    <S.Container>
      <img src={login} alt='image sign up' />

      <S.Content>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Nome'
            id='name'
            errorMessage={errors.name?.message}
            placeholder='seu nome'
            {...register('name', {
              required: {
                value: true,
                message: 'Todos os campos são obrigatórios',
              },
            })}
          />
          <TextField
            label='E-mail'
            id='email'
            placeholder='exemplo@gmail.com'
            type='email'
            {...register('email', {
              required: true,
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
          <S.ContentForm>
            <label htmlFor='enter_as'>Entrar como</label>
            <select
              {...register('enter_as', {
                required: true,
              })}
            >
              <option value=''>selecione...</option>
              <option value='Empresa'>Empresa</option>
              <option value='Profissional'>Profissional</option>
              <option value='Usuário'>Usuário</option>
            </select>
          </S.ContentForm>
          <S.CheckDiv>
            <input
              type='checkbox'
              {...register('terms', {
                required: true,
              })}
            />
            <p>
              Aceito os <Link to='/termos'> Termos e condições</Link> e autorizo
              o uso de meus dados de acordo com a Declaração de privacidade.
            </p>
          </S.CheckDiv>
          <SubmitButton />
        </form>
      </S.Content>
    </S.Container>
  )
}
