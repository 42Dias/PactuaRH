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
  label {
    display: block;
    margin: 20px 0;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: var(--text-title);
  }

  input {
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
    
    & + input {
    }
  }

  select {
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
    /* & + input {
      margin-top: 1rem;
    } */
  }

  .button {
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

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 230px;
    height: 2.5rem;
    padding: 0 10px;
    font-size: 13px;
    color: #ffffff;
    border: 0;
    border-radius: 0.25rem;
    transition: filter 0.2s ease-in-out;
    border: 1px solid #50C878;
    color: white;
    background: #50C878;

    &:hover {
      filter: brightness(0.9);
    }
  }

  .btn-actions{
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

  .btn-trash{
    background-color: #EA1C24;
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid #EA1C24;

    svg {
      color: white;
    }
  }

  .border {
    display: flex;
    align-items: center;
    flex-direction: column;
    
    .return {
      display: flex;
      align-items: center;
      width: 100%;

      & + .return {
        margin-top: 20px;
      }

      button {
        height: 3rem;
        width: 60px;
      }
    }
  }

  .add-component {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }
`;

export const divCheck = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;


export const DynamicDescription = styled.div`
display: flex;
justify-content: space-between;
div{ width: 45%; };
@media only screen and (max-width: 600px) {
  flex-direction: column;

  div {
    width: 100%;
  }

}

`















