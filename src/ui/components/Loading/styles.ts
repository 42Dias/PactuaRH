import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 5%;
  padding-bottom: 0;

  @keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  }

  .loading-spinner {
    width: 50px;
    height: 50px;

    border: 10px solid #c8c8c8; /* Light grey */
    border-top: 10px solid #000; /* Black */
    border-radius: 50%;
    
    animation: spinner 1.5s linear infinite;
    margin: 0 auto;
    transition: all .5s;


    display: ${props => props.theme.displayIcon || 'block'};
  }

`;





