//import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import './App.css';
import './index.css';
import { Login } from './pages/Login';
import Onboarding from './pages/Onboarding';
import { Signup } from './pages/Signup';
import { CompleteSignup } from './pages/CompleteSignup';
import { AuthCallBack } from './pages/AuthCallBack';
import { HomePageProv } from './pages/HomePageProv';

/**
 * Componente principale dell'applicazione.
 * Definisce le rotte di navigazione per le diverse pagine,
 * collegando i percorsi URL ai rispettivi componenti React.
 */
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-signup" element={<CompleteSignup />} />
        <Route path="/auth-callback" element={<AuthCallBack />} />
        <Route path="/home" element={<HomePageProv />} />
      </Routes>
    </>
  )
}

export default App

