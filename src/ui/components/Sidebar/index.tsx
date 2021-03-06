// import useState hook to create menu collapse state
import React, { useState } from 'react'
import * as S from './Sidebar.styled'

/*
DEPENDENDO DA ROLE NEM APARECERÁ CADASTRO!!!!


Varios dos dados são apenas Read

*/


// import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from 'react-pro-sidebar'

import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiEdit,
  FiTrendingUp,
  FiChevronsRight,
  FiUser,
} from 'react-icons/fi'

// import sidebar css from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css'
import { Link } from 'react-router-dom'
import { logo, logocor } from 'assets'



const Sidebar = () => {
  // create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true)

  // create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    // condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
  }


  async function logOut() {
    localStorage.clear()
    window.location.pathname = '/'

  }

  return (
    <>
      <S.Container>
        <div id='header'>

          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className='logotext'>
                {/* small and big change using menucollapse state */}
                {/* <p>{menuCollapse ? 'Logo' : 'Big Logo'}</p> */}
                {/* {menuCollapse ? <img src={logo} alt='image sign in' /> : <img src={logo} alt='image sign in' />} */}
              </div>
              <div className='closemenu' onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape='square'>

                <MenuItem active={true} icon={<FiHome />}>
                  <Link  to='/dashboard'>Inicío</Link>
                </MenuItem>
                <SubMenu title='Cadastros' icon={<FiEdit />}>

                  <MenuItem>
                    <Link className="menu-icons" to='/area'>Área</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/beneficios'>Benefícios</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/cargos'>Cargos</Link>
                  </MenuItem>


                  <MenuItem>
                    <Link className="menu-icons" to='/centroCustos'>Centro de Custos</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/escolaridade'>Escolaridade</Link>
                  </MenuItem>


                  <MenuItem>
                    <Link className="menu-icons" to='/funcoes'>Funções</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/habilidades'>Habilidades</Link>
                  </MenuItem>

                  {/* <MenuItem>
                    <Link className="menu-icons" to='/plano-de-carreira'>Plano de Carreira</Link>
                  </MenuItem> */}

                  <MenuItem>
                    <Link className="menu-icons" to='/profissionais'>Profissionais</Link>
                  </MenuItem>


                  {/* <MenuItem>Relatórios*</MenuItem> */}



                </SubMenu>

                <SubMenu title='Parâmetros' icon={<FiChevronsRight />}>
                  <MenuItem>
                    <Link className="menu-icons" to='/cadastro-de-avaliacao'>Avaliações</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/checkpoints'>Checkpoints</Link>
                  </MenuItem>


                  <MenuItem>
                    <Link className="menu-icons" to='/pdi'>Pdi</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/pri'>Pri</Link>
                  </MenuItem>

                  {/* 
                  <MenuItem>
                    <Link className="menu-icons" to='/questionarios'>Questionários</Link>
                  </MenuItem>
                  */}
                </SubMenu>


                <SubMenu title='Admin' icon={<FiUser />}>
                  <MenuItem>
                    <Link className="menu-icons" to='/cadastro-da-empresa'>Empresas</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/cadastrar-usuario'>Usuário</Link>
                  </MenuItem>
                </SubMenu>


                <SubMenu title='Relatórios' icon={<FiTrendingUp />}>

                  <MenuItem>
                    <Link className="menu-icons" to='/desempenho'> Desempenho</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/myAvaliations'> Minhas avaliações</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/responder-avaliacoes'>(Novo) Minhas avaliações</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link className="menu-icons" to='/relatorio-9box'> 9box </Link>
                  </MenuItem>

                </SubMenu>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu
                onClick={() => logOut()}
                iconShape='square'>
                <MenuItem icon={<FiLogOut />}>
                  <p >Sair</p>
                </MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </S.Container>
    </>
  )
}

export default Sidebar
