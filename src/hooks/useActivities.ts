import { getAttivitaFiltrate } from "@/api/getAttivitaFiltrate";
import type { AttivitaDTO } from "@/types/AttivitaDTO";
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { useState } from "react";

interface UseActivitiesProps {
  activities: AttivitaDTO[];
  loading: boolean;
  error: string | null;
  onSearchActivities: (filtro: FiltroAttivitaDTO, idUtente: number) => void;
}

export const useActivities = (): UseActivitiesProps => {
  const [activities, setActivities] = useState<AttivitaDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSearchActivities = async (filtro: FiltroAttivitaDTO, idUtente: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAttivitaFiltrate(filtro, idUtente); // Chiamata alla fetch
      setActivities(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { activities, loading, error, onSearchActivities };
};