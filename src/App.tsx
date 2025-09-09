import { Route, Routes } from 'react-router';
import './App.css';
import './index.css';
import { AuthCallBack } from './pages/AuthCallBack';
import { CompleteSignup } from './pages/CompleteSignup';
import { FiltersPage } from './pages/FiltersPage';
import { HomePageProv } from './pages/HomePageProv';
import { Login } from './pages/Login';
import Onboarding from './pages/Onboarding';
import { SearchPage } from './pages/SearchPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { Signup } from './pages/Signup';
import ChatList from './pages/ChatList';

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

        {/* Ricerca */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/filters" element={<FiltersPage />} />
        <Route path="/results" element={<SearchResultsPage />} />

        <Route path="/chat-list" element={<ChatList idUtente={12} />} />
      </Routes>
    </>
  )
}

export default App

