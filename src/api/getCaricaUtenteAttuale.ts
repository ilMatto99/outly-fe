import type { UtenteOutDTO } from "@/types/UtenteOutDTO";
import { BASE_URL_UTENTE } from "./config";

/**
 * Recupera i dati dell'utente loggato tramite un'email.
 *
 * - Effettua una richiesta GET all'endpoint `/api/utente/caricaUtenteAttuale` includendo l'email come parametro di query.
 * - Invia l'email codificata nell'URL per garantire la corretta formattazione.
 * - Lancia un errore se la risposta non è ok.
 *
 * @param email L'email dell'utente da caricare.
 * @returns Una Promise che risolve con i dati dell'utente.
 * @throws Error se la fetch non va a buon fine.
 */
export const getCaricaUtenteAttuale = async (email: string): Promise<UtenteOutDTO> => {
    const response = await fetch(`${BASE_URL_UTENTE}caricaUtenteAttuale?email=${encodeURIComponent(email)}`, {
        method: "GET",
        credentials: "include", 
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error(`Errore nella fetch a /api/utente/caricaUtenteAttuale?email=${encodeURIComponent(email)}`);
    }

    const data = response.json();

    return data;
}