import { BASE_URL_SPORT } from "./config"

/**
 * Recupera tutti gli sport disponibili dal backend.
 *
 * - Effettua una richiesta GET all'endpoint `/api/sport/carica`.
 * - Lancia un errore se la risposta non è ok.
 *
 * @returns Una Promise che risolve con i dati degli sport.
 * @throws Error se la fetch non va a buon fine.
 */

export const getSports = async () => {
    const response = await fetch(`${BASE_URL_SPORT}carica`, {
        method: 'GET',
    });

    if(!response.ok) {
        throw new Error("Errore nella fetch a api/sport/carica");
    }

    const data = await response.json();

    return data;
}