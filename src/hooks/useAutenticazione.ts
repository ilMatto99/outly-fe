import { getAutenticazione } from "@/api/getAutenticazione";
import type { AutenticazioneDTO } from "@/types/AutenticazioneDTO";
import type { UtenteDTO } from "@/types/UtenteDTO";
import { useState } from "react"
import { useNavigate } from "react-router";

export const useAutenticazione = (onUtenteNonTrovato?: () => void) => {
    const [error, setError] = useState<string | null>(null);
    const [utente, setUtente] = useState<UtenteDTO | null>(null);

    const navigate = useNavigate();

    const autenticazione = async (login: AutenticazioneDTO) => {
        try {
            const utenteLoggato = await getAutenticazione(login);

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