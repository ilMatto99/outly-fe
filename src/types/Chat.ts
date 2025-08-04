export interface Partecipante {
  idUtente: number;   
  nome:string;
  avatarUrl:string;  
}

export type Chat = {
    id: string;
    nome: string;
    partecipanti: Partecipante[];
    dataCreazione: string;
    dataUltimoMessaggio:string;
    gruppo: boolean;
    idAdmin: number;
    ultimoMessaggio: string;
    immagine:string;
}