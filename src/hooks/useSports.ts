import { getSports } from "@/api/getSports";
import type { Sport } from "@/types/Sport";
import { useEffect, useState } from "react";

/**
 * Hook personalizzato per recuperare e gestire gli sport disponibili.
 *
 * - Effettua una chiamata API a `getSports` al montaggio del componente.
 * - Imposta lo stato `loading` a `true` durante la richiesta e a `false` al completamento.
 * - In caso di successo, imposta lo stato `sports` con i dati ricevuti.
 * - Logga un errore in console in caso di fallimento della fetch degli sports.
 *
 * @returns Un oggetto contenente lo stato `sports` e lo stato `loading`.
 */

export const useSports = () => {
    const [sports, setSports] = useState<Sport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSports()
        .then(setSports)
        .catch((e) => console.log("Errore fetch livelli: ", e))
        .finally(() => setLoading(false))
    }, []);

    return { sports, loading }
}