import { getDifficolta } from "@/api/getDifficolta";
import type { Difficolta } from "@/types/Difficolta";
import { useEffect, useState } from "react"

/**
 * Hook personalizzato per recuperare e gestire le difficoltà disponibili.
 *
 * - Effettua una chiamata API a `getDifficolta` al montaggio del componente.
 * - Imposta lo stato `loading` a `true` durante la richiesta e a `false` al completamento.
 * - In caso di successo, imposta lo stato `difficulties` con i dati ricevuti.
 * - Logga un errore in console in caso di fallimento della fetch delle difficoltà.
 *
 * @returns Un oggetto contenente lo stato `difficulties` e lo stato `loading`.
 */
export const useDifficolta = () => {
    const [difficulties, setDifficulties] = useState<Difficolta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDifficolta()
        .then(setDifficulties)
        .catch((e) => console.log("Errore fetch difficoltà: ", e))
        .finally(() => setLoading(false))
    }, []);

    return { difficulties, loading }
}