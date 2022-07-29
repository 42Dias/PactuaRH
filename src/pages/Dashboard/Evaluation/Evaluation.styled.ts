import { Route } from 'react-router-dom';
import styled from 'styled-components'
import { theme } from 'config'

export const LinksScore = styled.div`
  width: 40%;
  height: 10px;
  background: rgba(80, 200, 120, 0.4);
  border-radius: 5px;


  margin: 14px auto;
  /* margin: 14px auto; */

  position: relative;

  div {
    position: relative;
    
    &:nth-child(1) {
      left: 1%;
    }


    &:nth-child(2) {
      left: 89%;
      small {
        left: -5%;
      }
    }

    small {
      position: absolute;
      font-size: 14px;
      bottom: -40px;
      color: #757575;
    }

    .activeColor {
      background-color: #50c878;
    }

    .active-color-text {
      color: #000000;
    }

    span {
      position: absolute;
      width: 30px;
      height: 30px;
      bottom: -18px;
      left: 1%;
      border-radius: 100%;
      background: #b9e9c9;
    }
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 980px;
  margin: 0 auto;

  .ant-switch-checked {
    background-color: #000;
  }

  h2 {
    margin: 30px 0;
  }

  @media (max-width: 970px) {
    padding: 0 12%;
  }

  .box-avaliacoes {
    margin: 20px 0;
    background: #fff;
    height: 86px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3%;

    a {
      color: black;
      text-decoration: underline;
    }

    p{
      margin: 0;
    }

    .flex-configs {
      display: flex;
      gap: 0 10px;

      .settings {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0 5px;

        width: 145px;
        height: 40px;

        background: #f7f7f7;
        border-radius: 5px;
        border: 0;

        transition: all 0.2s ease-in;

        &:hover {
          filter: brightness(0.8);
        }
      }

      .delete {
        width: 40px;
        height: 40px;

        background: #cc0044;
        border-radius: 5px;
        color: white;

        border: 0;

        transition: all 0.2s ease-in;

        &:hover {
          filter: brightness(0.8);
        }
      }

      .edit {
        width: 40px;
        height: 40px;

        border: 1px solid #000000;
        border-radius: 5px;
        background: white;

        transition: all 0.2s ease-in;

        &:hover {
          filter: brightness(0.8);
        }
      }
    }

    span {
      font-size: 16px;
    }
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

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  gap: 0 20px;

  .active-class {
    color: #2d2d2d;
  }

  a, p {
    color: #b3b3b3;
    margin-bottom: 0;
    
    transition: all 0.2s ease-in;

    &:hover {
      filter: brightness(0.8);
    }
  }
`

export const FlexInit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border: 0;
    width: 176px;
    height: 53px;
    color: white;
    background: #000000;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
  }
`

export const ContainerForm = styled.form`
  h2 {
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

  button.send {
    margin-top: 1.5rem;
    border: 1px solid black;
    padding: 0 1.5rem;
    width: 150px;
    height: 2.4rem;
    font-size: .8rem;
    font-weight: 400;
    color: #ffffff;
    background: black;
    border-radius: 0.25rem;
    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: brightness(0.9);
    }
  }

  button.close {
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    width: 150px;
    height: 2.4rem;
    font-size: .8rem;
    font-weight: 400;
    color: black;
    background: transparent;
    border: 1px solid black;
    border-radius: 0.25rem;
    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: brightness(0.9);
    }
  }

  .confgContainer {
    display: flex;
    flex-direction: column;
    padding: -20px 0;
    align-items: flex-start;

    .flexBtn {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      button {
        width: 140px;
        height: 35px;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 0 10px;

        color: #ffffff;
        background: black;
        border: 0;
        border-radius: 0.25rem;
        transition: filter 0.2s ease-in-out;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }

    .checkContainer {
      div {
        display: flex;
        gap: 0 10px;
        align-items: center;
        input[type='checkbox'] {
          width: 15px;
          height: 15px;
        }
      }
    }
  }

  .gridScore {
    display: grid;
    gap: 0 60px;
    grid-template-columns: repeat(4, 1fr);
    padding: 12px 8px;
    width: 750px;
  }

  .checkContainer {
    div {
      display: flex;
      gap: 0 10px;
      align-items: center;
      input[type='radio'] {
        width: 15px;
        height: 15px;
      }
    }
  }

  .addBox {
    padding: 0 8px;
    margin: 10px 0;
    border: 1px solid #c5c5c5;
    border-radius: 5px;
    align-items: center;
    height: 60px;

    div {
      display: flex;
      gap: 0 20px;
      margin-left: auto;

      button {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #cc0044;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border: 0;
        
        /* 
        &:first-child {
          background: #cc0044;
          color: white;

          transition: 0.9s;

          &:hover {
            filter: brightness(0.9);
          }
        } */

        &:last-child {
          border: 1px solid #000000;

          transition: 0.9s;

          &:hover {
            filter: brightness(0.9);
          }
        }
      }
    }
  }
`


export const ButtonsContainer = styled.div`
display: flex;
width: 100%;
/* width: 100%; */
align-items: center;
/* justify-content: space-between; */

  button:first-child{
    /* margin-left: 50px; */
    margin-right: 50px;
  }



  button {
    width: 140px;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0 10px;

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
