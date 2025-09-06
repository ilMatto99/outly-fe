import { useState } from "react";
import type { AttivitaDTO } from "@/types/AttivitaDTO";
import { creaAttivita } from "@/api/postAttivitaCreate";
import { useAuth } from "@/hooks/useAuth";

/**
 * Hook per creare una nuova attività autenticata.
 */
export const useCreateActivities = () => {
  const { userId, loadingAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createActivity = async (
    activity: Omit<AttivitaDTO, "id" | "idCreatore">
  ) => {
    if (loadingAuth) {
      throw new Error("Verifica autenticazione in corso...");
    }
    if (!userId) {
      throw new Error(
        "Utente non autenticato. Effettua il login per creare un'attività."
      );
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Omit<AttivitaDTO, "id"> = {
        ...activity,
        idCreatore: userId, // assegna l'id utente autenticato
        dataAttivita: activity.dataAttivita
          ? `${activity.dataAttivita}T00:00:00`
          : "",
      };

      const { ok, status, body } = await creaAttivita(payload);
      if (!ok) {
        throw new Error(`Errore ${status}: ${JSON.stringify(body)}`);
      }

      setSuccess(true);
      return body;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Errore sconosciuto";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createActivity,
    loading,
    error,
    success,
  };
};
