import { getDatiUtenteGoogle } from "@/api/getDatiUtenteGoogle";
import type { LocationState } from "@/types/UtenteParzialeDTO";
import { useEffect } from "react";
import { useNavigate } from "react-router"
import { useAuth } from "./useAuth";
import { getCaricaUtenteAttuale } from "@/api/getCaricaUtenteAttuale";

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

    const { setUserId } = useAuth();

    useEffect(() => {
        async function handleAuth() {

            try {
                const data = await getDatiUtenteGoogle();
                console.log("Risposta backend (Login Google):", data);

                if (data.registrato) {
                    const email = data.utenteParzialeDTO.email;
                    if (email) {
                        const utente = await getCaricaUtenteAttuale(email);
                        console.log("Dati utente attuale:", utente);

                        setUserId(utente.idUtente);

                        navigate("/home");
                    } else {
                        console.error("Email non trovata nell'oggetto utente parziale di Google");
                        setUserId(null);
                        navigate("/login")
                    }
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
                setUserId(null);
                console.log(`Errore nel login Google: ${(error as Error).message}`);
                navigate("/login");
            }
        }

        handleAuth();
    }, [navigate, setUserId])
}