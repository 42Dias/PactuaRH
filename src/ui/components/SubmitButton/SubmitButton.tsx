import React from 'react'
import * as S from './SubmitButton.styled'

interface IProps {
  className?: string
}

export function SubmitButton({ className }: IProps) {
  return (
    <S.Container>
      <button type='submit' className={className}>Entrar</button>
    </S.Container>
  )
}
