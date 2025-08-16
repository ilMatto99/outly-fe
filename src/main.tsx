import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './AuthProvider.tsx'

/**
 * Punto di ingresso principale dell'applicazione React.
 *
 * - Rende l'applicazione all'interno di un `StrictMode` per rilevare potenziali problemi.
 * - Avvolge l'applicazione con il `BrowserRouter` per abilitare la navigazione.
 * - Utilizza `AuthProvider` per fornire lo stato di autenticazione a tutta l'applicazione.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
