import { BASE_URL } from "./config";

export const getChats = async (idUtente: number) => {
  const response = await fetch(`${BASE_URL}chat/carica?idUtente=${idUtente}`, {
    method: "GET",
  });

  const data = await response.json(); 

  if (!response.ok) {
    console.error("Errore:", data);
    throw new Error("Errore durante il caricamento delle chat");
  }

  return data;
};
