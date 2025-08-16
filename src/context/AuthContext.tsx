import type { AuthContextType } from "@/types/AuthContextType";
import { createContext } from "react";

/**
 * Contesto React per la gestione dell'autenticazione.
 *
 * Utilizzato per condividere lo stato di autenticazione dell'utente (`userId`, `loadingAuth`, ecc.)
 * attraverso l'intera applicazione, rendendolo accessibile a qualsiasi componente che lo richieda.
 * Il valore predefinito è `undefined`.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);