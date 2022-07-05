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
import QuestionnairesAnswer from 'pages/Dashboard/QuestionnairesAnswer'
import AnswerQuestionary from 'pages/Dashboard/AnswerQuestionary'
import MyAvaliations from 'pages/Dashboard/MyAvaliations'
import { Assessments } from 'pages/Dashboard/Assessments'
import { EvaluationRecord } from 'pages/Dashboard/EvaluationRecord'
import { Evaluation } from 'pages/Dashboard/Evaluation'
import { Questions } from 'pages/Dashboard/Questions'
import { MyRatings } from 'pages/Dashboard/MyRatings'
import { Answer } from 'pages/Dashboard/Answer'
import { MyQuestionaries } from 'pages/Dashboard/MyQuestionaries'
import { AnswerNotNumeric } from 'pages/Dashboard/AnswerNotNumeric'

const RoutesApp = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'                     element={<SignIn />} />
          <Route path='/cadastro'             element={<SignUp />} />
          <Route path='/termos'               element={<Terms />} />
          <Route path='/dashboard'            element={<Home />} />
          <Route path='/cadastrar-usuario'    element={<UserRegistration />} />
          <Route path='/cadastro-da-empresa'  element={<Company />} />
          <Route path='/status-de-usuario'    element={<UserStatus />} />
          <Route path='/profissionais'        element={<Professionals />} />
          <Route path='/cargos'               element={<Positions />} />
          <Route path='/funcoes'              element={<FunctionsPage />} />
          <Route path='/centroCustos'         element={<CostCenter />} />
          <Route path='/area'                 element={<Area />} />
          <Route path='/beneficios'           element={<Benefits />} />
          <Route path='/questionarios'        element={<Questionnaires />} />
          <Route path='/habilidades'          element={<Skills />} />
          <Route path='/escolaridade'         element={<Education />} />
          <Route path='/planos'               element={<Plans />} />
          <Route path='/desempenho'           element={<Performance />} />
          <Route path='/avaliacao-geral'      element={<GeneralEvaluation />} />
          <Route path='/relatorio-9box'       element={<Box />} />
          <Route path='/plano-de-carreira'    element={<Career />} />
          <Route path='/avaliacoes'           element={<Avaliations />} />
          <Route path='/pdi'                  element={<Pdi />} />
          <Route path='/pdi-item/:id'         element={<PdiItem />} />
          <Route path='/pri-item/:id'         element={<PriItem />} />
          <Route path='/pri'                  element={<Pri />} />
          <Route path='/checkpoints'          element={<Checkpoints />} />
          <Route path='/responder-questionario/:id' element={<AnswerQuestionary />} />
          <Route path='/respostas/:id'        element={<QuestionnairesAnswer />} />
          <Route path='/respostas/:id'        element={<MyAvaliations />} />
          <Route path='/MyAvaliations'        element={<MyAvaliations />} />
          <Route
          path='/questionario-perguntas/:id' element={<QuestionaryQuestions />}
          />
          <Route
            path='/questionario-score/:id'   element={<QuestionaryScore />}
          />
          
          <Route path='/minhas-avaliacoes'          element={<Assessments />}      />
          <Route path='/cadastro-de-avaliacao'      element={<EvaluationRecord />} />
          <Route path='/avaliacao'                  element={<Evaluation />}       />
          <Route path='/avaliacao/:id'              element={<Evaluation />}       />
          <Route path='/perguntas'                  element={<Questions />}        />
          <Route path='/perguntas/:id'              element={<Questions />}        />
          <Route path='/minhas-avaliacoes/:id'      element={<MyRatings />}        />
          <Route path='/responder-avaliacoes'       element={<MyRatings />}        />
          <Route path='/responder-questionarios/:id'element={<MyQuestionaries />}  /> 
          <Route path='/respostas'                  element={<Answer    />}        />
          <Route path='/responder/:id'              element={<Answer    />}        />
          <Route path='/responder-nao-numerico/:id' element={<AnswerNotNumeric/>}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutesApp
