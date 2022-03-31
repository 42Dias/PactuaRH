import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 980px;
  margin: 0 auto;
  @media (max-width: 970px) {
    padding: 0 12%;
  }
`

export const Title = styled.h2`
  font-size: 24px;
  background: white;
  padding: 20px 0;
`

export const Body = styled.body`
  width: 100vw;
  height: 100vh;

`

export const Test = styled.div`
  margin:25px;
  width: 480px;
  height: 180px;
  background: #FEFDFF;
  border-radius: 5px;
}
 
div{
  padding:14px;
  
}

`

export const Table = styled.table`
  /* width: 100%; */
  background: white;
  border-radius: 5px;
  margin: 5% 5% 5% 25%;

  h3{
position:relative;
left:95px;
  }
`

export const TrTitle = styled.tr`
  margin: 50px 0 !important;
  height: 53px;
 
  td {
    padding: 20px;
  }
`

export const TrSecond = styled.tr`
  height: 53px;
  background: white;
  td {
    padding: 20px;
  }
  button {
    background: transparent;
    border: 0;
  }
`

export const ContainerForm = styled.form`
input {
  padding: 0 1.5rem;
  width: 385px;
  height: 71.03px;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid rgba(35, 35, 35, 0.33);
  box-sizing: border-box;
  border-radius: 5px;

}
`


export const Button = styled.div`
  display: flex;
  margin: 40px 0;
  button {
    background: #000;
    border: 0;
    width: 120px;
    height: 48px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-left: 10px;
    }
  }
`