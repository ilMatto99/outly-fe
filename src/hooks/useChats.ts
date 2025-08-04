import { getChats } from "@/api/getChats";
import type { Chat } from "@/types/Chat";
import { useEffect, useState } from "react";

export const useChats = (idUtente:number) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getChats(idUtente)
        .then(setChats)
        .catch((e) => console.log("Errore fetch chats: ", e))
        .finally(() => setLoading(false))
    }, [idUtente]);


    return { chats, loading }
}