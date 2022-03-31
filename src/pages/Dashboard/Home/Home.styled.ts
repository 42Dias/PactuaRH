import styled from 'styled-components'
import { theme } from 'config'

export const Body = styled.body`
  width: 100vw;
  height: 100vh;
`

export const Title = styled.h2`
  font-size: 24px;
  background: white;
  padding: 20px 0;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 980px;
  margin: 0 auto;

  @media (max-width: 970px) {
    padding: 0 12%;
  }
`

export const ContainerCall = styled.div`
  width: 100%;
  height: 239px;

  margin: 40px 0;

  background-color: #000;
  border-radius: 10px;

  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 50px;

  p {
    padding: 10px 0;
  }

  a {
    width: 176px;
    height: 43px;

    background: #ffffff;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
  }

  img {
    width: 370px;
    height: 306px;
  }
`

export const GridDetails = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 50px;

  @media (max-width: 870px) {
    grid-template-columns: 1fr;
  }
`

export const ContentUsers = styled.div`
  background: white;
  border-radius: 10px;
  height: 37vh;
  overflow-y: auto;

  margin: 0 0 20px 0;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #1b1b1b;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #1b1b1b;
  }
`

export const DetailsUser = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  height: 37vh;

  margin: 0 0 20px 0;
  @media (max-width: 940px) {
    text-align: center;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;

  h3 {
    font-size: 14px;
    color: ${theme.colors.textSecondary};
  }

  button {
    width: 96px;
    height: 48px;
    border-radius: 5px;
    border: 0;
    background: black;
    color: white;

    transition: 0.5s;

    &:hover {
      background: #080808;
    }

    :last-child {
      margin-left: 10px;
      border: 1px solid black;
      background: transparent;
      color: black;

      &:hover {
        background: #aaa;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    button {
      margin: 10px 0;
      :last-child {
        margin: 0;
      }
    }
  }
`

export const Photo = styled.div`
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: #222;
    object-fit: cover;
  }
`

export const TitleUser = styled.div`
  h2 {
    font-size: 16px;
  }

  margin-top: 30px;
`

export const FlexPhoto = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 15px;
    margin-left: 10px;
  }
`

export const TextDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 6px;
  p {
    color: ${theme.colors.textSecondary};
    margin-left: 10px;
    font-size: 14px;
  }
`
