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
import CostCenter from 'pages/Dashboard/costCenter'
import Career from 'pages/Dashboard/Career'
import Avaliations from 'pages/Dashboard/Avaliations'
import Pdi from 'pages/Dashboard/Pdi'
import PdiItem from 'pages/Dashboard/PdiItem'
import Checkpoints from 'pages/Dashboard/Checkpoints'
import Pri from 'pages/Dashboard/Pri'
import PriItem from 'pages/Dashboard/PriItem'
import QuestionaryScore from 'pages/Dashboard/QuestionaryScore'
import QuestionaryQuestions from 'pages/Dashboard/QuestionaryQuestions'
import QuestionariosAnswer from 'pages/Dashboard/QuestionnairesAnswer'

const RoutesApp = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/'                    element={<SignIn />}           />
        <Route path='/cadastro'            element={<SignUp />}           />
        <Route path='/termos'              element={<Terms />}            />
        <Route path='/dashboard'           element={<Home />}             />
        <Route path='/cadastrar-usuario'   element={<UserRegistration />} />
        <Route path='/cadastro-da-empresa' element={<Company />}          />
        <Route path='/status-de-usuario'   element={<UserStatus />}       />
        <Route path='/profissionais'       element={<Professionals />}    />
        <Route path='/cargos'              element={<Positions />}        />
        <Route path='/funcoes'             element={<FunctionsPage />}    />
        <Route path='/centroCustos'        element={<CostCenter />}       />
        <Route path='/area'                element={<Area />}             />
        <Route path='/beneficios'          element={<Benefits />}         />
        <Route path='/questionarios'       element={<Questionnaires />}   />
        <Route path='/habilidades'         element={<Skills />}           />
        <Route path='/escolaridade'        element={<Education />}        />
        <Route path='/planos'              element={<Plans />}            />
        <Route path='/desempenho'          element={<Performance />}      />
        <Route path='/avaliacao-geral'     element={<GeneralEvaluation />}/>
        <Route path='/relatorio-9box'      element={<Box />}              />
        <Route path='/plano-de-carreira'   element={<Career />}           />
        <Route path='/avaliacoes'          element={<Avaliations />}      />
        <Route path='/pdi'                 element={<Pdi />}              />
        <Route path='/pdi-item/:id'        element={<PdiItem />}          />
        <Route path='/pri-item/:id'        element={<PriItem />}          />
        <Route path='/pri'                 element={<Pri />}              />
        <Route path='/checkpoints'         element={<Checkpoints />}      />

        <Route path='/resposta/:id'               element={<QuestionariosAnswer />}   />
        <Route path='/questionario-perguntas/:id' element={<QuestionaryQuestions />}  />
        <Route path='/questionario-score/:id'     element={<QuestionaryScore />}      />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default RoutesApp
