import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

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

export const FlexButtons = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;

    button + button {
      margin-left: 20px;
    }
  }

  margin: 40px 0;

  button {
    background: #ED6B47;
    border: 0;
    width: 180px;
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

export const Table = styled.table`
  /* width: 100%; */
  background: white;
  border-radius: 5px;
`

export const TrTitle = styled.tr`
  margin: 50px 0 !important;
  height: 53px;
  td {
    padding: 20px;
    font-weight: bold;
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
  h2 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: var(--text-title);
  }

  input, textarea {
    padding: 0 1.5rem;
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    font-weight: 400;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    margin: 10px 0;
    &::placeholder {
      color: #747474;
    }
  }
  textarea {
    padding: 1rem;
    height: 5rem;
  }
  select {
    margin: 10px 0;
    padding: 0 1.5rem;
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    font-weight: 400;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;

    &::placeholder {
      color: #747474;
    }
  }

  button {
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background: black;
    border: 0;
    border-radius: 0.25rem;
    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: brightness(0.9);
    }
  }
  
  .border{
    /* border-bottom: 2px solid #0000007d; */
    margin-bottom: 10px;
  }

  .btn-actions{
    display: block;
    /*
    margin: 5px auto 20px auto;
    */
    width: 50px;
    height: 50px;
    position: relative;

    svg {
      position:absolute;
      left:0;
      right:0;
      margin-left:auto;
      margin-right:auto;
      top:0;
      bottom:0;
      margin-top:auto;
      margin-bottom:auto;
    } 
  }

  .btn-plus{
    width: 100%;
    background: #50C878;
  }

  .return {
    align-items: baseline;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    
    select{
      width: 85%;
    }

    input{
      width: 85%;
    }
    
    button {
      width: 15%;
      height: 3rem;
    }
  }

  .btn-trash{
    background-color: #EA1C24 !important;
    margin-top: 0 !important;
    margin-left: 5px;
    margin-right: 5px;
  }
`


export const divCheck = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`

export const Label = styled.label`
  font-size: 16px;
  margin-left: 5px;
`
