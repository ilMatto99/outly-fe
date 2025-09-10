import type { UtenteDTO } from "@/types/UtenteDTO";
import { BASE_URL_UTENTE } from "@/api/config";

export const getUserById = async (id: number): Promise<UtenteDTO> => {
  const response = await fetch(`${BASE_URL_UTENTE}cercaUtenteTramiteId?idUtente=${id}`);
  
  const contentType = response.headers.get("content-type");
  if (!response.ok || !contentType?.includes("application/json")) {
    const text = await response.text();
    throw new Error(`Errore nel recupero utente: ${text}`);
  }

  return response.json();
};
