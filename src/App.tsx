import { Route, Routes } from 'react-router';
import './App.css';
import './index.css';
import { Login } from './pages/Login';
import Onboarding from './pages/Onboarding';
import { Signup } from './pages/Signup';
import { CompleteSignup } from './pages/CompleteSignup';
import { AuthCallBack } from './pages/AuthCallBack';
import { HomePageProv } from './pages/HomePageProv';
import { SearchPage } from './pages/SearchPage';
import { FiltersPage } from './pages/FiltersPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { CreateActivity } from './pages/CreateActivity';

/**
 * Componente principale dell'applicazione.
 * Definisce le rotte di navigazione per le diverse pagine,
 * collegando i percorsi URL ai rispettivi componenti React.
 */
function App() {

  return (
    <>
      <Routes>
        {/* Onboarding e Autenticazione */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-signup" element={<CompleteSignup />} />
        <Route path="/auth-callback" element={<AuthCallBack />} />

        {/* Homepage */}
        <Route path="/home" element={<HomePageProv />} />

        {/* Creazione Attività */}
        <Route path="/create-activity" element={<CreateActivity />} />
        
        {/* Ricerca */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/filters" element={<FiltersPage />} />
        <Route path="/results" element={<SearchResultsPage />} />
      </Routes>
    </>
  )
}

export default App

