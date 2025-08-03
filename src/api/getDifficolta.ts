import { BASE_URL_DIFFICOLTA } from "./config"

/**
 * Recupera tutte le difficoltà disponibili dal backend.
 *
 * - Effettua una richiesta GET all'endpoint `/api/difficolta/carica`.
 * - Lancia un errore se la risposta non è ok.
 *
 * @returns Una Promise che risolve con i dati delle difficoltà.
 * @throws Error se la fetch non va a buon fine.
 */
export const getDifficolta = async () => {
    const response = await fetch(`${BASE_URL_DIFFICOLTA}carica`, {
        method: 'GET'
    });

    if(!response.ok) {
        throw new Error("Errore nella fetch api/difficolta/carica");
    }

    const data = await response.json();

    return data;
}