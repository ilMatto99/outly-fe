/**
 * DTO per i dati di un utente.
 *
 * Utilizzato per rappresentare i dati di un utente completo recuperati dal backend.
 */
export type UtenteOutDTO = {
    idUtente: number;
    nome: string;
    cognome: string;
    email: string;
    passwordHash: string;
    bio: string;
    avatarUrl: string;
    livello: number;
    citta: string;
}