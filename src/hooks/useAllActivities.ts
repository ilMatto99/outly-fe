import { useEffect, useState } from "react";
import type { AttivitaDTO } from "../types/AttivitaDTO";
import { getAllActivities } from "../api/getAllActivities";

/**
 * Hook personalizzato per recuperare tutte le attività dal backend.
 */
export const useAllActivities = () => {
  const [activities, setActivities] = useState<AttivitaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchActivities = async () => {
      try {
        const data = await getAllActivities();
        if (isMounted) {
          setActivities(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Errore durante il caricamento delle attività");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return { activities, loading, error };
};
