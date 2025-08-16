import { getDifficolta } from "@/api/getDifficolta";
import { getSports } from "@/api/getSports";
import type { Difficolta } from "@/types/Difficolta";
import type { Sport } from "@/types/Sport";
import { useEffect, useState } from "react";

interface useFiltersDataProps {
    difficulties: Difficolta[];
    sports: Sport[];
    loading: boolean;
    error: string | null;
}

/**
 * Hook personalizzato per recuperare dati multipli per i filtri (difficoltà e sport).
 *
 * - Esegue le chiamate API in parallelo per ottimizzare i tempi di caricamento.
 *
 * @returns Un oggetto contenente gli array di dati per difficoltà e sport,
 * insieme allo stato di caricamento e di errore.
 */
export const useFiltersData = (): useFiltersDataProps => {
    const [difficulties, setDifficulties] = useState<Difficolta[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [diffData, sportsData] = await Promise.all([
                    getDifficolta(),
                    getSports()
                ]);
                setDifficulties(diffData);
                setSports(sportsData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return { difficulties, sports, loading, error };
}