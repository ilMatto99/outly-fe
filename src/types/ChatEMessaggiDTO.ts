import type { Chat } from "./Chat";

export type Visualizzato = {
  idVisualizzato: number;
  nome: string;
  avatarUrl:string;
  dataVisualizzazione: string; 
}


export type Messaggi = {
  id: string;
  idChat: string;
  idSender: number;
  testo: string;
  visualizzato: Visualizzato[];
  dataInvio: string; 
}

export type ChatEMessaggiDTO = {
    chat: Chat;
    messaggi: Messaggi[];
}