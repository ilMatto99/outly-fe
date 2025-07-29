import { postAutenticazione } from "@/api/postAutenticazione";
import type { AutenticazioneDTO } from "@/types/AutenticazioneDTO";
import type { UtenteDTO } from "@/types/UtenteDTO";
import { useState } from "react"
import { useNavigate } from "react-router";

/**
 * Hook personalizzato per gestire l'autenticazione dell'utente.
 *
 * @param onUtenteNonTrovato Una funzione di callback opzionale da eseguire se l'utente non viene trovato.
 * @returns Un oggetto contenente la funzione `autenticazione`, lo stato `error` e lo stato `utente`.
 */

export const useAutenticazione = (onUtenteNonTrovato?: () => void) => {
    const [error, setError] = useState<string | null>(null);
    const [utente, setUtente] = useState<UtenteDTO | null>(null);

    const navigate = useNavigate();

    /**
     * Esegue l'autenticazione dell'utente.
     *
     * - Tenta di autenticare l'utente chiamando `postAutenticazione`.
     * - In caso di successo, imposta l'utente, resetta l'errore e naviga alla pagina `/home`.
     * - In caso di errore, imposta il messaggio di errore, esegue `onUtenteNonTrovato` se definito e naviga alla pagina `/signup`
     * passando i dati di login e un flag `utenteNonTrovato`.
     *
     * @param login Il DTO contenente le credenziali di autenticazione (email e password).
     */
    
    const autenticazione = async (login: AutenticazioneDTO) => {
        try {
            const utenteLoggato = await postAutenticazione(login);

            setUtente(utenteLoggato);
            setError(null);
            navigate("/home");

            navigate("/home");
        } catch (err) {
            setError(`Errore durante l'autenticazione. + ${err}`);
            if (onUtenteNonTrovato) onUtenteNonTrovato();

            navigate("/signup", {
                state: {
                    email: login.email,
                    passwordHash: login.password,
                    utenteNonTrovato: true
                }
            });
        }
    };

    return {
        autenticazione,
        error,
        utente
    }
}