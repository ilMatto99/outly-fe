import { getAttivitaFiltrate } from "@/api/getAttivitaFiltrate";
import type { AttivitaDTO } from "@/types/AttivitaDTO";
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

/**
 * Hook personalizzato per recuperare le attività filtrate.
 *
 * @param filters L'oggetto contenente i filtri da applicare alla ricerca delle attività.
 * @returns Un oggetto contenente l'array di attività, lo stato di caricamento e lo stato di errore.
 */
export const useActivities = (filters: FiltroAttivitaDTO) => {
  const [activities, setActivities] = useState<AttivitaDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { userId, loadingAuth } = useAuth();

  useEffect(() => {
    const fetchAttivita = async () => {
      // Non fa la fetch se l'autenticazione è ancora in corso o se userId non è disponibile
      if (loadingAuth || userId === null) {
        setLoading(false); 
        if (!loadingAuth && userId === null) {
          setError("ID utente non disponibile. Effettua il login per visualizzare le attività.");
        }
        setActivities([]); // Resetta i dati
        return;
      }

      setLoading(true);
      setError(null);

      try {
        
        const data = await getAttivitaFiltrate(filters, userId);
        setActivities(data);
        console.log("Dati delle attività ricevuti:", data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchAttivita();
  }, [filters, userId, loadingAuth])

  return { activities, loading, error };
};