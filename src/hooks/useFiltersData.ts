import { getDifficolta } from "@/api/getDifficolta";
import { getLivelli } from "@/api/getLivelli";
import type { Difficolta } from "@/types/Difficolta";
import type { Livello } from "@/types/Livello";
import { useEffect, useState } from "react";

interface useFiltersDataProps {
    difficulties: Difficolta[];
    levels: Livello[];
    loading: boolean;
    error: string | null;
}

export const useFiltersData = (): useFiltersDataProps => {
    const [difficulties, setDifficulties] = useState<Difficolta[]>([]);
    const [levels, setLevels] = useState<Livello[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [diffData, levelData] = await Promise.all([
                    getDifficolta(),
                    getLivelli()
                ]);
                setDifficulties(diffData);
                setLevels(levelData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return { difficulties, levels, loading, error };
}