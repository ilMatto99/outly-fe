import { BASE_URL_LIVELLO } from "./config";

/**
 * Recupera tutti i livelli disponibili dal backend.
 *
 * - Effettua una richiesta GET all'endpoint `/api/livello/carica`.
 * - Lancia un errore se la risposta non è ok.
 *
 * @returns Una Promise che risolve con i dati dei livelli.
 * @throws Error se la fetch non va a buon fine.
 */

export const getLivelli = async () => {
    const response = await fetch(`${BASE_URL_LIVELLO}carica`, {
        method: 'GET'
    }
    );
    
    if(!response.ok) {
        throw new Error("Errore nella fetch a api/livello/carica");
    }

    const data = await response.json();

    return data;
}