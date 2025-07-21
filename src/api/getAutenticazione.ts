import type { AutenticazioneDTO } from "@/types/AutenticazioneDTO"

export const getAutenticazione = async (login: AutenticazioneDTO) => {
    const response = await fetch("/api/utente/autenticazione", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
    });

    if(!response.ok) {
        throw new Error("Errore nella fetch a /api/utente/autenticazione")
    };

    const data = response.json();

    return data;
}