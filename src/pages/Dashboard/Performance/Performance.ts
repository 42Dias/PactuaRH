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
  width: 100%;
  height: 100vh;

`

export const Information = styled.div`
  margin:30px 5px;
  padding:25px;
  width: 500px !important; 
  height: 180px;
  background: #FEFDFF;
  border-radius: 5px;
}
 

p{
  padding:5px 15px;
}

.table-title{
  text-align: center;
  height: 80px;

}
`

export const Standard = styled.tr`
  margin: 40px 0 !important;
  height: 53px;

 
  p{
    padding-left: 160px;
    font-weight: 500;
    font-size: 18px;
  }

  td {
    padding: 10px 30px;
    font-weight: 500;
    
  }
  .valor{
    color: rgba(0, 0, 0, 0.5);
  }

`

export const TrStandard = styled.tr`

  td {
    color: rgba(0, 0, 0, 0.5);
    padding-left: 65px;
    text-align: center;
    
  }

`

export const Table = styled.table`

  width: 910px !important;
  background: white;
  border-radius: 5px;
  padding: 5px 45px;
  margin: 5%;

  p{
  
    position:relative;
    text-align: center;
    left: 280px;
    margin:25px;
    font-weight: 500;
   font-size: 20px;
    

  }



`

export const TrTitle = styled.tr`

  td {
    position-relative;
    text-align: center;
    font-weight: 500;
    padding: 10px 100px;
  }

  

`

export const TrSecond = styled.tr`
  height: 53px;
  background: white;

  td {
    text-align: center;
  }


 
`

export const ContainerForm = styled.form`
width:500px;
padding: 15px;

input {
  padding: 15px;
  width:400px;
  height: 85px;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid rgba(35, 35, 35, 0.33);
  box-sizing: border-box;
  border-radius: 5px;
}
`


export const Button = styled.div`
  display: flex;
  flex-direction: column;

  button {
    position: relative;
    top:30px;
    right:540px;
    background: #000;
    border: 0;
    width: 150px;
    height: 48px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
`