import { getChats } from "@/api/getChats";
import type { ChatDTO } from "@/types/ChatDTO";
import { useEffect, useState } from "react";

export const useChats = (idUtente:number) => {
    const [chats, setChats] = useState<ChatDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getChats(idUtente)
        .then(setChats)
        .catch((e) => console.log("Errore fetch chats: ", e))
        .finally(() => setLoading(false))
    }, [idUtente]);

    console.log(chats);

    return { chats, loading }
}