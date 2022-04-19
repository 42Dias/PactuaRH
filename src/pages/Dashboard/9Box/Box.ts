import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  display: flex;
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
background: #FEFDFF;
border-radius: 5px;
margin:10% 0%;


div{
    text-align: center;
    margin:50px 0px 100px 0px;
    padding:5px 5px 45px 0px;
    width: 90px;
    height: 70px;
    
}
p{
  
    color: rgba(0, 0, 0, 0.7);
    padding:5px 5px 0px 20px;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
}

`
export const Boxes = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    margin:10% 0%;


    p{
        padding:30px;
        text-align: center;
    }

div{ 
    margin:10px;
    width: 300px;
    height: 170px;
    border-radius: 5px;
}

div:nth-child(4n){
    background: rgba(255, 246, 20, 0.07);
    border: 1px solid #FFF614;
}

div:nth-child(7){
    background: rgba(255, 0, 0, 0.07);
    border: 1px solid #FF0000;
    
}
div:nth-child(3){
    background: rgba(7, 154, 39, 0.07);
border: 1px solid #079A27;
    
}
div:nth-child(4n+1){
    background: rgba(0, 133, 255, 0.07);
    border: 1px solid #0085FF;
    
}


div:nth-child(4n+2){
    background: rgba(48, 244, 16, 0.07);
    border: 1px solid #30F410;
    
}
`
export const InfoFooter = styled.div `
background: #FEFDFF;
border-radius: 5px;
position:relative;
width:940px;
left: 100px;
bottom:100px;

p{
    text-align: center;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 400;
    font-size: 20px;
    letter-spacing: .2rem;
    display: inline-block;
    padding:25px 80px 25px 20px ;
}

`
