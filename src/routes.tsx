import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from 'pages/SignUp'
import Terms from 'pages/Terms/Terms'
import Home from 'pages/Dashboard/Home'
import UserRegistration from 'pages/Dashboard/UserRegistration'
import UserStatus from 'pages/Dashboard/UserStatus'
import Company from 'pages/Dashboard/Company'
import Professionals from 'pages/Dashboard/Professionals'
import Positions from 'pages/Dashboard/Positions'
import FunctionsPage from 'pages/Dashboard/FunctionsPage'
import Benefits from 'pages/Dashboard/Benefits'
import Questionnaires from 'pages/Dashboard/Questionnaires'
import Plans from 'pages/Dashboard/Plans'
import GeneralEvaluation from 'pages/Dashboard/GeneralEvaluation'
import Performance from 'pages/Dashboard/Performance'
import Education from 'pages/Dashboard/Education'
import Skills from 'pages/Dashboard/Skills'
import Area from 'pages/Dashboard/Area'
import Box from 'pages/Dashboard/9Box'

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/PactuaRH/' element={<SignIn />} />
        <Route path='/PactuaRH/cadastro' element={<SignUp />} />
        <Route path='/PactuaRH/termos' element={<Terms />} />
        <Route path='/PactuaRH/dashboard' element={<Home />} />
        <Route path='/PactuaRH/cadastrar-usuario' element={<UserRegistration />} />
        <Route path='/PactuaRH/cadastro-da-empresa' element={<Company />} />
        <Route path='/PactuaRH/status-de-usuario' element={<UserStatus />} />
        <Route path='/PactuaRH/profissionais' element={<Professionals />} />
        <Route path='/PactuaRH/cargos' element={<Positions />} />
        <Route path='/PactuaRH/funcoes' element={<FunctionsPage />} />
        {/*  */}
        <Route path='/PactuaRH/area' element={<Area />} />
        <Route path='/PactuaRH/beneficios' element={<Benefits />} />
        <Route path='/PactuaRH/questionarios' element={<Questionnaires />} />
        <Route path='/PactuaRH/habilidades' element={<Skills />} />
        <Route path='/PactuaRH/escolaridade' element={<Education />} />
        {/*  */}
        <Route path='/PactuaRH/planos' element={<Plans />} />
        <Route path='/PactuaRH/desempenho' element={<Performance />} />
        <Route path='/PactuaRH/avaliacao-geral' element={<GeneralEvaluation />} />
         <Route path='/PactuaRH/relatorio-9box' element={<Box />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp
