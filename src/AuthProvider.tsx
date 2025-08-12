import { type ReactNode, useState, useEffect } from "react";
import { getDatiUtenteGoogle } from "./api/getDatiUtenteGoogle";
import { AuthContext } from "./context/AuthContext";
import { getCaricaUtenteAttuale } from "./api/getCaricaUtenteAttuale";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userId, setUserIdState] = useState<number | null>(() => {
        const storeId = localStorage.getItem("userId");
        return storeId ? parseInt(storeId, 10) : null;
    });
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

    const setUserId = (id: number | null) => {
        setUserIdState(id);
        if (id !== null) {
            localStorage.setItem("userId", id.toString());
        } else {
            localStorage.removeItem("userId");
        }
    }

    useEffect(() => {
        const checkInitialAuth = async () => {
            try {
                // Controlla l'autenticazione con Google
                const data = await getDatiUtenteGoogle();

                // Se l'utente è registrato e ha un'email
                if (data.registrato && data.utenteParzialeDTO.email) {
                    // Carica l'utente completo dal backend per ottenere l'ID
                    const utente = await getCaricaUtenteAttuale(data.utenteParzialeDTO.email);

                    // Imposta l'ID utente che verrà salvato in localStorage
                    if (utente.idUtente) {
                        setUserId(utente.idUtente);
                    }
                } else {
                    // L'utente non è autenticato con Google o non è registrato
                    // Lo stato iniziale (da localStorage) è già corretto
                    setUserId(null); // Assicura che lo stato sia nullo se non c'è autenticazione
                }
            } catch (error) {
                console.error("Errore nel controllo autenticazione iniziale:", error);
                setUserId(null);
            } finally {
                setLoadingAuth(false);
            }
        }
        checkInitialAuth();
    }, [userId]);

    return (
        <AuthContext.Provider value={{ userId, setUserId, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}