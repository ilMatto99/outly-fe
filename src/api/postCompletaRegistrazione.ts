import type { UtenteDTO } from "@/types/UtenteDTO";

export const getCompletaRegistrazione = async (user: UtenteDTO) => {
    const response = await fetch("http://localhot:8080/api/utente/completaUtente", {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    
    if (!response.ok) {
        throw new Error("Errore nella fetch a /api/utente/completaUtente");
    }
    
    const data = response.json();
    
    return data;
}