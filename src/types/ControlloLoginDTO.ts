import type { UtenteParzialeDTO } from "./UtenteParzialeDTO"

/**
 * DTO per il risultato del controllo dello stato di login.
 * Indica se l'utente è già registrato e fornisce dati parziali se non lo è.
 */

export type ControlloLoginDTO = {
     /**
     * Contiene i dati parziali dell'utente se non è ancora completamente registrato.
     * Sarà popolato con informazioni come nome, cognome, email, avatarUrl.
     */
    utenteParzialeDTO: UtenteParzialeDTO;
    registrato: boolean;
}