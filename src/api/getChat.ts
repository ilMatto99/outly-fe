import { BASE_URL } from "./config";

export const getChat = async (idChat: string) => {
  const response = await fetch(`${BASE_URL}chat/caricaChatSingola?idChat=${idChat}`, {
    method: "GET",
  });

  const data = await response.json(); 

  if (!response.ok) {
    console.error("Errore:", data);
    throw new Error("Errore durante il caricamento della chat");
  }

  console.log(data);

  return data;
};
