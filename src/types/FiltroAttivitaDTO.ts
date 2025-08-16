/**
 * DTO per i filtri di ricerca delle attività.
 */
export type FiltroAttivitaDTO = {
    dataInizio?: string;
    dataFine?: string;
    difficolta?: number;
    sport?: number;
    km?: number;
    luogo?: string;
    rangeKm?: number;
}