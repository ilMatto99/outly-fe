/**
 * DTO per i dati parziali di un utente.
 * Utilizzato quando solo alcune informazioni dell'utente sono disponibili o richieste,
 * ad esempio dopo un'autenticazione tramite provider esterni (es. Google).
 */
export type UtenteParzialeDTO = {
    id?: number;
    nome?: string;
    cognome?: string;
    email?: string;
    avatarUrl?: string;
}

/**
 * Estensione di `UtenteParzialeDTO` per includere la password hash.
 * Usato per passare dati di stato tra le pagine, in particolare durante il flusso di signup.
 */
export type LocationState = UtenteParzialeDTO & {
    passwordHash?: string;
}