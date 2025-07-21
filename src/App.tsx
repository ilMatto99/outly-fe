//import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import './App.css';
import './index.css';
import { Login } from './pages/Login';
import Onboarding from './pages/Onboarding';
import { Signup } from './pages/Signup';
import { CompleteSignup } from './pages/CompleteSignup';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-signup" element={<CompleteSignup />} />
      </Routes>
    </>
  )
}

export default App

