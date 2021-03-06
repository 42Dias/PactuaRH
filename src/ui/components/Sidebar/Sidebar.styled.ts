import styled from "styled-components/macro";
import { theme } from "config";

export const Container = styled.div`

  #header {
    position: absolute;
    /*
    width: 220px;
    */
  }
  #header .pro-sidebar {
    height: 100vh;
    z-index: 1;
  }
  #header .closemenu {
    color: ${theme.colors.gray.gray1};
    position: absolute;
    left: 24px;
    line-height: 20px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 22px;
    top: 29px;
    cursor: pointer;
  }
  #header .pro-sidebar {
    width: calc(100% - 5px);
    min-width: 100%;
  }
  #header .pro-sidebar.collapsed {
    width: calc(80px - 5px);
    min-width: 80px;
  }
  #header .pro-sidebar-inner {
    background-color: ${theme.colors.gray.gray12};
    box-shadow: 0.5px 0.866px 2px 0px rgba(0, 0, 0, 0.15);
  }
  #header .inner-submenu-arrows {
    margin-top: 80px;
  }
  #header .pro-sidebar-inner .pro-sidebar-layout {
    overflow-y: hidden;
  }
  #header .pro-sidebar-inner .pro-sidebar-layout .logotext p {
    font-size: 20px;
    padding: 0 20px;
    color: #000;
    font-weight: bold;
  }
  #header .pro-sidebar-inner .pro-sidebar-layout ul {
    padding: 0 5px;
  }
  #header .pro-sidebar-inner .pro-sidebar-layout ul .pro-inner-item {
    color: ${theme.colors.gray.gray3};
    margin: 10px 0px;
    font-weight: bold;
  }
  #header
    .pro-sidebar-inner
    .pro-sidebar-layout
    ul
    .pro-inner-item
    .pro-icon-wrapper {
    background-color: #fbf4cd;
    color: #000;
    border-radius: 3px;
  }
  #header
    .pro-sidebar-inner
    .pro-sidebar-layout
    ul
    .pro-inner-item
    .pro-icon-wrapper
    .pro-item-content {
    color: #000;
  }
  #header .logo {
    padding: 20px;
  }

  #header .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item {
    /* background-color: ${theme.colors.gray.gray3}; */
    background-color: ${theme.colors.gray.gray12};
    overflow: hidden;
  }

  #header
    .pro-sidebar-inner
    .pro-sidebar-layout
    ul
    .pro-inner-item
    .pro-icon-wrapper {
    background-color: #ed6b47;
    color: ${theme.colors.gray.gray2};
  }

  .react-slidedown{
    overflow-x: hidden;
    max-width: 192px;
    height: 0;
  }

  .pro-item-content .menu-icons{
    /* overflow: hidden; */
    /* text-overflow: unset; */
    white-space: break-spaces !important;
    overflow-wrap: break-word !important;
  }

  .open .react-slidedown{
    min-height: fit-content !important;
    max-height: 35vh !important;
    overflow-y: scroll !important;


     /* width */
    ::-webkit-scrollbar{
        width: 5px;
      }
        


    /* Track */
    ::-webkit-scrollbar-track{
        background: transparent;
        border-radius: 10px;

    }
        
    /* Handle */
    ::-webkit-scrollbar-thumb{
        background: #ffffff3d;
        border-radius: 10px;
    }
        
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover{
        background: transparent;
    }
        

    ::-webkit-scrollbar-track {
      border-radius: 5px ;
    }
  .open .react-slidedown {
    /* height: 60vh !important; */
    overflow: scroll;
  }

  img {
    display: block;
    width: 150px;
    margin: 0 auto;
  }

  /* @media only screen and (max-width: 720px) {
    html {
      overflow: hidden;
    }
  } */
}`;
