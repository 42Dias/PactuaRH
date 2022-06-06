import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom'



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

const RoutesApp = () => {
  return (
    <>
      <BrowserRouter basename='/PactuaRH'>
        <HashRouter>
          <Switch>
            <Route  path='/'                     component={<SignIn />} />
            <Route  path='/cadastro'             component={<SignUp />} />
            <Route  path='/termos'               component={<Terms />} />
            <Route  path='/dashboard'            component={<Home />} />
            <Route  path='/cadastrar-usuario'    component={<UserRegistration />} />
            <Route  path='/cadastro-da-empresa'  component={<Company />} />
            <Route  path='/status-de-usuario'    component={<UserStatus />} />
            <Route  path='/profissionais'        component={<Professionals />} />
            <Route  path='/cargos'               component={<Positions />} />
            <Route  path='/funcoes'              component={<FunctionsPage />} />
            <Route  path='/centroCustos'         component={<CostCenter />} />
            <Route  path='/area'                 component={<Area />} />
            <Route  path='/beneficios'           component={<Benefits />} />
            <Route  path='/questionarios'        component={<Questionnaires />} />
            <Route  path='/habilidades'          component={<Skills />} />
            <Route  path='/escolaridade'         component={<Education />} />
            <Route  path='/planos'               component={<Plans />} />
            <Route  path='/desempenho'           component={<Performance />} />
            <Route  path='/avaliacao-geral'      component={<GeneralEvaluation />} />
            <Route  path='/relatorio-9box'       component={<Box />} />
            <Route  path='/plano-de-carreira'    component={<Career />} />
            <Route  path='/avaliacoes'           component={<Avaliations />} />
            <Route  path='/pdi'                  component={<Pdi />} />
            <Route  path='/pdi-item/:id'         component={<PdiItem />} />
            <Route  path='/pri-item/:id'         component={<PriItem />} />
            <Route  path='/pri'                  component={<Pri />} />
            <Route  path='/checkpoints'          component={<Checkpoints />} />
            <Route  path='/respostas/:id'        component={<QuestionnairesAnswer />} />
            <Route  path='/MyAvaliations'        component={<MyAvaliations />} />
            <Route  path='/questionario-perguntas/:id' component={<QuestionaryQuestions />} />
            <Route  path='/questionario-score/:id'     component={<QuestionaryScore />}/>
            <Route  path='/responder-questionario/:id' component={<AnswerQuestionary />} />
          </Switch>
        </HashRouter>
      </BrowserRouter>
    </>
  )
}

export default RoutesApp
