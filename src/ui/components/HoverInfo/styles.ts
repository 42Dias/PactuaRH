import styled from "styled-components";

export const HoverContainer = styled.div`
transition: all 1s;
position: relative;
display: flex;
align-items: center;
justify-content: center;

.checkText{
  position: absolute;
  display: flex;
  justify-items: center;
  justify-content: center;
  height: 0px;
  width: 0px;
  overflow: hidden;
  transition: all .5s;
  
  top:  95%;
  left: 95%;
  
  background-color: #2b2b2b;
  color: #adadad;
}


&:hover .checkText
{
  height: fit-content;
  width:  fit-content;
  min-width:  170px;
  padding: 10px;
  border-radius: 0 2.5px 2.5px 2.5px;
}

`





