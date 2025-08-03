/**
 * Recupera le attività filtrate in base ai criteri specificati.
 *
 * - Costruisce i parametri di query dall'oggetto filtro e dagli ID.
 * - Effettua una richiesta GET all'endpoint `/api/attivita/attivitaFiltrate`.
 * - Lancia un errore se la risposta non è ok.
 *
 * @param filtro L'oggetto FiltroAttivitaDTO con i criteri di ricerca.
 * @param idUtente L'ID dell'utente che effettua la ricerca.
 * @returns Una Promise che risolve con i dati delle attività filtrate.
 * @throws Error se la fetch non va a buon fine.
 */

import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { BASE_URL_ATTIVITA } from "./config";

export const getAttivitaFiltrate = async (
    filtro: FiltroAttivitaDTO,
    idUtente: number
) => {
    const params = new URLSearchParams();

    //Aggiunge l'idUtente come parametro obbligatorio
    params.append("idUtente", idUtente.toString());

    //Aggiunge i capi del filtro se presenti
    if (filtro.dataInizio) {
        params.append("dataInizio", filtro.dataInizio.toISOString());
    }
    if (filtro.dataFine) {
        params.append("dataFine", filtro.dataFine.toISOString());
    }
    if (filtro.difficolta !== undefined && filtro.difficolta !== null) {
        params.append("difficolta", filtro.difficolta.toString());
    }
    if (filtro.sport !== undefined && filtro.sport !== null) {
        params.append("sport", filtro.sport.toString());
    }
    if (filtro.km !== undefined && filtro.km !== null) {
        params.append("km", filtro.km.toString());
    }
    if (filtro.luogo) {
        params.append("luogo", filtro.luogo);
    }
    if (filtro.rangeKm !== undefined && filtro.rangeKm !== null) {
        params.append("rangeKm", filtro.rangeKm.toString());
    } else if (filtro.km !== undefined && filtro.km !== null) {
        params.append("rangeKm", filtro.km.toString());
    }

    const queryString = params.toString();
    const url = `${BASE_URL_ATTIVITA}attivitaFiltrate?${queryString}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    if(!response.ok) {
        throw new Error(`Errore nella fetch a ${url}`)
    };

    const data = await response.json();

    return data;
}