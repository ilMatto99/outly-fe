import { getChats } from "@/api/getChats";
import type { Chat } from "@/types/ChatList";
import { useEffect, useState } from "react";

export const useChatList = (idUtente:number) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getChats(idUtente)
        .then(setChats)
        .catch((e) => console.log("Errore fetch chatList: ", e))
        .finally(() => setLoading(false))
    }, [idUtente]);

    return { chats, loading }
}