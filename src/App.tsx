// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { SignIn, SignUp, Terms } from 'pages'
// import { SIGN_IN, SIGN_UP, TERMS } from 'routes'
import RoutesApp from './routes'
import { GlobalStyle } from 'ui'

function App() {
  return (
    <>
      <RoutesApp />
      <GlobalStyle />
    </>
  )
}

export default App
