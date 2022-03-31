import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  height: 100vh;

  img {
    height: 100vh;

    @media (max-width: 940px) {
      display: none;
    }
  }
`

export const Content = styled.div`
  position: absolute;
  left: 55%;
  top: 7%;
  max-width: 345px;

  @media (max-width: 940px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export const Password = styled.div`
  button {
    background: none;
    border: 0;
    bottom: 0;
    position: relative;
    left: 320px;
    transition: 1s;
    top: -41px;
    width: 30px;
    color: ${theme.colors.black};
    opacity: 45%;

    svg {
      margin: -7px 0 0 -30px;
      position: relative;
    }
  }
`

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;

  select {
    width: 345px;
    height: 48px;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 10px 0;
    padding: 0 19px;
    border: 1px solid ${theme.colors.neutral[200]};
    background: transparent;
    color: ${theme.colors.black};

    :focus {
      border: 1px solid ${theme.colors.black};
    }
  }

  label {
    font-size: 14px;
    color: ${theme.colors.black};
  }
`

export const CheckDiv = styled.div`
  display: flex;
  margin: 10px 0;

  input[type='checkbox'] {
    margin-top: 6px;
  }

  p {
    font-size: 12px;
    margin-left: 10px;
  }
`
