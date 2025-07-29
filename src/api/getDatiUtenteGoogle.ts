import type { ControlloLoginDTO } from "@/types/ControlloLoginDTO";
import { BASE_URL_UTENTE } from "./config";

/**
 * Recupera i dati dell'utente autenticato tramite Google.
 *
 * - Effettua una richiesta GET all'endpoint `/api/utente/getDatiUtenteGoogle`.
 * - Include le credenziali per mantenere la sessione utente.
 * - Lancia un errore se la risposta non è ok.
 *
 * @returns Una Promise che risolve con i dati di controllo login dell'utente.
 * @throws Error se la fetch non va a buon fine.
 */

export const getDatiUtenteGoogle = async (): Promise<ControlloLoginDTO> => {
    const response = await fetch(`${BASE_URL_UTENTE}getDatiUtenteGoogle`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Errore nella fetch a /api/utente/getDatiUtenteGoogle");
    }

    const data = await response.json();

    return data;
}