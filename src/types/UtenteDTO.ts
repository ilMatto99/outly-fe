/**
 * DTO completo per i dati di un utente.
 * Utilizzato per la registrazione completa di un nuovo utente o per recuperare tutti i dati del profilo.
 */
export type UtenteDTO = {
    nome: string;
    cognome: string;
    email: string;
    passwordHash: string;
    bio: string;
    avatarUrl: string;
    livello: number;
    citta: string;
}

