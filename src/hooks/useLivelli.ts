import { getLivelli } from "@/api/postLivelli";
import { useEffect, useState } from "react"

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