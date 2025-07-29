/**
 * DTO per i dati di autenticazione dell'utente.
 * Utilizzato per inviare le credenziali di login (email e password).
 */
export type AutenticazioneDTO = {
    email: string;
    password: string;
}