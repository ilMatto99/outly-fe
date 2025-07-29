import { getDatiUtenteGoogle } from "@/api/getDatiUtenteGoogle";
import type { LocationState } from "@/types/UtenteParzialeDTO";
import { useEffect } from "react";
import { useNavigate } from "react-router"

/**
 * Hook personalizzato per gestire il callback dell'autenticazione Google.
 *
 * - Al montaggio del componente, tenta di recuperare i dati dell'utente da Google.
 * - Se l'utente è già registrato, lo reindirizza alla pagina `/home`.
 * - Se l'utente non è registrato, lo reindirizza alla pagina `/complete-signup` passando i dati parziali dell'utente ottenuti da Google.
 * - Logga un errore in console in caso di fallimento del login Google.
 */

export const useAuthCallBack = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function handleAuth() {
            try {
                const data = await getDatiUtenteGoogle();

                if (data.registrato) {
                    navigate("/home");
                } else {
                    // Prepara i dati per CompleteSignup usando UtenteParzialeDTO
                    const partialUserData: LocationState = {
                        nome: data.utenteParzialeDTO.nome,
                        cognome: data.utenteParzialeDTO.cognome,
                        email: data.utenteParzialeDTO.email,
                        avatarUrl: data.utenteParzialeDTO.avatarUrl,
                        passwordHash: "",
                    };
                    navigate("/complete-signup", {
                        state: partialUserData 
                    });
                }
            } catch (error) {
                console.log((error as Error).message)
                throw new Error("Errore nel login Google");
            }
        }

        handleAuth();
    }, [navigate])
}