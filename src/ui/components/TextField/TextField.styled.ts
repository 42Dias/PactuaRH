import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${theme.colors.black};
`

export const Input = styled.input`
  width: 345px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 20px;
  border: 1px solid ${theme.colors.neutral[200]};
  background: transparent;
  color: ${theme.colors.black};

  :focus {
    border: 1px solid ${theme.colors.black};
  }
`

export const ErrorMessage = styled.span`
  color: ${theme.colors.red[700]};
  font-size: 10px;
`
