import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  /*margin-left: 80px;*/
  
  h2 {
    margin: 2rem 0;
    font-size: 1.3rem;
    color: var(--text-title);

  }

  max-width: 650px;
  margin: 0 auto;
  /*padding-left: 80px;*/


  @media (max-width: 1054px) {
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
    background: #000;
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

  input {
    margin: 10px 0;
    padding: 0 1.5rem;
    width: 100%;
    height: 4rem;
    font-size: 1rem;
    font-weight: 400;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    &::placeholder {
      color: #747474;
    }
    & + input {
      margin-top: 1rem;
    }
  }

  select {
    padding: 0 1.5rem;
    width: 100%;
    height: 4rem;
    font-size: 1rem;
    font-weight: 400;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    margin-top: 1rem;

    &::placeholder {
      color: #747474;
    }
    & + input {
      margin-top: 1rem;
    }
  }

  button {
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    width: 100%;
    height: 4rem;
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
`
export const Question = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #0000002e;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: all 0.2s ease-in;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }



  p {
    margin: 13px 0;
  }

  span {
    color: #d93025;
  }


`

export const Alternative = styled.div`
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  
  div {
    margin 5px 0;
  }

  input {
    backgrond: blue;
    color: red;
    transition: all 0.2s ease-in;
  }

  label{
    margin-left: 0.5rem;
  }



`



export const SubmitButton = styled.button`
  width: 345px;
  height: 48px;
  margin: 20px auto;
  border-radius: 4px;
  border: 0;
  transition: transform 1s;
  background: ${theme.colors.black};
  color: ${theme.colors.neutral[100]};


  &:hover {
    transform: translateX(0px) scale(1.1);
  }
`