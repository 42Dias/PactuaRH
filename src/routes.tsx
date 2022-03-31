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

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/cadastro' element={<SignUp />} />
        <Route path='/termos' element={<Terms />} />
        <Route path='/dashboard' element={<Home />} />
        <Route path='/cadastrar-usuario' element={<UserRegistration />} />
        <Route path='/status-de-usuario' element={<UserStatus />} />
        <Route path='/cadastro-da-empresa' element={<Company />} />
        <Route path='/profissionais' element={<Professionals />} />
        <Route path='/cargos' element={<Positions />} />
        <Route path='/funcoes' element={<FunctionsPage />} />
        <Route path='/beneficios' element={<Benefits />} />
        <Route path='/questionarios' element={<Questionnaires />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp
