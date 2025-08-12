import { getDifficolta } from "@/api/getDifficolta";
import type { Difficolta } from "@/types/Difficolta";
import { useEffect, useState } from "react";

interface useFiltersDataProps {
    difficulties: Difficolta[];
    loading: boolean;
    error: string | null;
}

export const useFiltersData = (): useFiltersDataProps => {
    const [difficulties, setDifficulties] = useState<Difficolta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [diffData] = await Promise.all([
                    getDifficolta(),
                ]);
                setDifficulties(diffData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return { difficulties, loading, error };
}