 // import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { SignIn, SignUp, Terms } from 'pages'
// import { SIGN_IN, SIGN_UP, TERMS } from 'routes'
import RoutesApp from './routes'
import { GlobalStyle } from 'ui'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <RoutesApp />
      <GlobalStyle />

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </>
  )
}

export default App
