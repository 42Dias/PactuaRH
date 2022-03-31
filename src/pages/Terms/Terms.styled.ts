import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    padding: 40px;
  }

  h1 {
    margin: 30px 0 30px 0;
  }

  strong {
    text-align: center;
    padding: 0 40px;
  }

  a {
    margin: 30px 0;
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    border-radius: 5px;

    color: white;
  }
`

export const Header = styled.header`
  img {
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  background: #000;
`
