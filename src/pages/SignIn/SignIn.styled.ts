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
  left: 52%;
  top: 27%;
  max-width: 345px;

  a {
    color: ${theme.colors.black};
    display: flex;
    justify-content: center;
    text-align: center;
    display: block;
    max-width: 345px;
    margin: 30px 0;
  }

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
    top: -37px;
    width: 30px;
    color: ${theme.colors.black};
    opacity: 45%;

    svg {
      margin: -7px 0 0 -30px;
      position: relative;
    }
  }
`
