import styled from 'styled-components'


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
  padding: 0 1.5rem;
  width: 150px;
  height: 2.4rem;
  font-size: .8rem;
  font-weight: 400;
  color: #ffffff;
  background: black;
  border: 0;
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

      &:first-child {
        background: #cc0044;
        color: white;

        transition: 0.9s;

        &:hover {
          filter: brightness(0.9);
        }
      }

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