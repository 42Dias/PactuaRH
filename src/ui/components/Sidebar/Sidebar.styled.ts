import styled from 'styled-components'

export const Container = styled.div`
  #header {
    position: absolute;
    width: 220px;
  }
  #header .pro-sidebar {
    height: 100vh;
    z-index: 1;
  }
  #header .closemenu {
    color: white;
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
    width: 100%;
    min-width: 100%;
  }
  #header .pro-sidebar.collapsed {
    width: 80px;
    min-width: 80px;
  }
  #header .pro-sidebar-inner {
    background-color: #000;
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
    color: white;
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
    background-color: #000;
  }

  #header
    .pro-sidebar-inner
    .pro-sidebar-layout
    ul
    .pro-inner-item
    .pro-icon-wrapper {
    background-color: #2b2b2b;
    color: white;
  }

  /* @media only screen and (max-width: 720px) {
    html {
      overflow: hidden;
    }
  } */
`
