import { theme } from 'config'
import styled from 'styled-components'

export const Container = styled.div`
  button {
    width: 345px;
    height: 48px;
    border-radius: 4px;
    border: 0;
    transition: transform 1s;
    background: ${theme.colors.black};
    color: ${theme.colors.neutral[100]};

    margin: 20px 0;

    :hover {
      transform: translateX(0px) scale(1.1);
    }
  }
`
