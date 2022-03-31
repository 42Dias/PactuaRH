import { theme } from 'config'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: ${theme.colors.neutral[100]};
    font-family: ${theme.font.family};
    overflow-x: hidden;
    color: ${theme.colors.black};
  }

  button {
    cursor: pointer;
    font-family: ${theme.font.family};
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  &::selection {
    color: ${theme.colors.neutral[100]};
    background: ${theme.colors.black};
  }

  .react-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    overflow-y: auto;
  }
  
  .react-modal-content {
    margin: 40px 0;
    position: relative;
    padding: 3rem;
    width: 100%;
    max-width: 576px;
    max-height: 650px;
    height: 100%;
    overflow: auto;
    background: white;
    border-radius: 0.25rem;
  }

  .react-modal-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: transparent;
    border: 0;
    transition: filter 0.2s ease-in-out;
    
    &:hover {
      filter: brightness(0.8);
    }
  }
`
