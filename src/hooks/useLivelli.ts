import { getLivelli } from "@/api/getLivelli";
import { useEffect, useState } from "react"

/**
 * Hook personalizzato per recuperare e gestire i livelli disponibili.
 *
 * - Effettua una chiamata API a `getLivelli` al montaggio del componente.
 * - Imposta lo stato `loading` a `true` durante la richiesta e a `false` al completamento.
 * - In caso di successo, imposta lo stato `livelli` con i dati ricevuti.
 * - Logga un errore in console in caso di fallimento della fetch dei livelli.
 *
 * @returns Un oggetto contenente lo stato `livelli` e lo stato `loading`.
 */

export const useLivelli = () => {
    const [livelli, setLivelli] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLivelli()
        .then(setLivelli)
        .catch((e) => console.log("Errore fetch livelli: ", e))
        .finally(() => setLoading(false))
    }, []);

    return { livelli, loading }
}