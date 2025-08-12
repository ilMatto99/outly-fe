import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { BASE_URL_ATTIVITA } from "./config";

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

export const getAttivitaFiltrate = async (
    filters: FiltroAttivitaDTO,
    idUtente: number
) => {
    // Costruiamo la stringa dei parametri di query
    const params = new URLSearchParams();

    // Aggiungiamo l'idUtente (obbligatorio per il backend)
    params.append('idUtente', idUtente.toString());

    // Aggiungiamo i parametri solo se esistono
    if (filters.rangeKm !== undefined) params.append('rangeKm', filters.rangeKm.toString());
    if (filters.dataInizio) params.append('dataInizio', filters.dataInizio);
    if (filters.dataFine) params.append('dataFine', filters.dataFine);
    if (filters.difficolta !== undefined) params.append('difficolta', filters.difficolta.toString());
    if (filters.sport !== undefined) params.append('sport', filters.sport.toString());
    if (filters.km !== undefined) params.append('km', filters.km.toString());
    if (filters.luogo) params.append('luogo', filters.luogo);

    const queryString = params.toString();
    const url = `${BASE_URL_ATTIVITA}attivitaFiltrate?${queryString}`;
    console.log(url)

    const response = await fetch(url, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error(`Errore nella fetch a ${url}`)
    };

    const data = await response.json();

    return data;
}