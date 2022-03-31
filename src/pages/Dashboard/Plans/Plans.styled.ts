import styled from 'styled-components'
// import { theme } from 'config'

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

  img{
    margin: 25px 10px 45px 0px;
    width: 50px;
    height: 50px;
  }

  @media (max-width: 970px) {
    padding: 0 12%;
  }
`

export const ContainerPlans = styled.div`

display: grid;
grid-template-columns: repeat(3, 2fr);
margin-bottom:75px;

  div{ 
    text-align: center;
    width: 280px;
    height: 538px;
    margin-left:70px;
    padding:5px 10px 45px 0px;
    background: #FEFDFF;
    border-radius: 5px;
    align-item:center;
  }



  .planos-icon{
    position:relative;
    margin-left: 10px;
    align-item:left;
    width:30px;
  }

`

