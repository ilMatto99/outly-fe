import type { UtenteDTO } from "@/types/UtenteDTO";
import { BASE_URL_UTENTE } from "./config";

/**
 * Completa la registrazione di un nuovo utente.
 *
 * - Invia i dati dell'utente per la registrazione tramite una richiesta POST.
 * - Imposta l'header 'Content-Type' a 'application/json'.
 * - Lancia un errore se la risposta non è ok.
 *
 * @param user DTO contenente i dati dell'utente per la registrazione.
 * @returns Una Promise che risolve con i dati di risposta della registrazione.
 * @throws Error se la fetch non va a buon fine.
 */

export const postCompletaRegistrazione = async (user: UtenteDTO) => {
    const response = await fetch(`${BASE_URL_UTENTE}registrazione`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    
    if (!response.ok) {
        throw new Error("Errore nella fetch a /api/utente/completaUtente");
    }
    
    const data = response.json();
    
    return data;
}