import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 980px;
  margin: 0 auto;

  h2 {
    margin: 30px 0;
  }

  @media (max-width: 970px) {
    padding: 0 12%;
  }
`

export const Body = styled.body`
  width: 100vw;
  height: 100vh;
`

export const Title = styled.h2`
  font-size: 24px;
  background: white;
  padding: 20px 0;
`

export const GridPasso = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  a {
    width: 100%;
    height: 216px;

    background: #FFFFFF;
    box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    border: 1px solid #fff;
    
    transition: .5s;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 4%;

    text-align: center;

    &:first-child {
      border: 1px solid #50C878
    }
  }
`