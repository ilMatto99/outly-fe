import type { AttivitaDTO } from "../types/AttivitaDTO";
import { BASE_URL } from "./config";

export const getAllActivities = async (): Promise<AttivitaDTO[]> => {
  try {
    const response = await fetch(`${BASE_URL}attivita/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dati ricevuti da /getAll:", data);
    return data;
  } catch (error) {
    console.error("Errore in getAllActivities:", error);
    throw error;
  }
};
