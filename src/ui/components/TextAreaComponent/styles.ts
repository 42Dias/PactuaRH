
import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;


  textarea {
    margin: 10px 0;
    padding: 1.7rem;
    width: 100%;
    height: 5rem;
    font-size: 1rem;
    font-weight: 400;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    &::placeholder {
      color: #747474;
    }
  }

`