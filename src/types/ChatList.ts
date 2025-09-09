// Definizione di Partecipante (esempio base, da adattare)
type Partecipante = {
    idUtente: number;
    nome: string;
    avatarUrl:string;
    dataIngresso:string;
};

// Tipo per la tua entità
export type Chat = {
    id: string;
    nome: string;
    partecipanti: Partecipante[];
    dataCreazione: string;
    dataUltimoMessaggio: string;
    gruppo: boolean;
    idAdmin: number;
    ultimoMessaggio: string;
    immagine: string;
};
