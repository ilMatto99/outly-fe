import type { UtenteOutDTO } from "@/types/UtenteOutDTO";
import { BASE_URL_UTENTE } from "./config";

export const getCaricaUtenteAttuale = async (email: string): Promise<UtenteOutDTO> => {
    const response = await fetch(`${BASE_URL_UTENTE}caricaUtenteAttuale?email=${encodeURIComponent(email)}`, {
        method: "GET",
        credentials: "include", 
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error(`Errore nella fetch a /api/utente/caricaUtenteAttuale?email=${encodeURIComponent(email)}`);
    }

    const data = response.json();

    return data;
}