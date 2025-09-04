import type { AutenticazioneDTO } from "@/types/AutenticazioneDTO"
import { BASE_URL_UTENTE } from "./config";

/**
 * Effettua l'autenticazione di un utente.
 *
 * - Invia i dati di login (email e password) al backend tramite una richiesta POST.
 * - Imposta l'header 'Content-Type' a 'application/json'.
 * - Lancia un errore se la risposta non è ok.
 *
 * @param login DTO contenente le credenziali di autenticazione.
 * @returns Una Promise che risolve con i dati di risposta dell'autenticazione.
 * @throws Error se la fetch non va a buon fine.
 */

export const postAutenticazione = async (login: AutenticazioneDTO) => {
    const response = await fetch(`${BASE_URL_UTENTE}autenticazione`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
    });

    if(!response.ok) {
        throw new Error("Errore nella fetch a /api/utente/autenticazione")
    };

    const data = response.json();

    console.log(data);

    return data;
}