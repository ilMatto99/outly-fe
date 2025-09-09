import { getChat } from "@/api/getChat";
import type { ChatEMessaggiDTO } from "@/types/ChatEMessaggiDTO";
import { useEffect, useState } from "react";

export const useChat = (idChat:string) => {
    const [chatAndMessagges, setChatAndMessagges] = useState<ChatEMessaggiDTO>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getChat(idChat)
        .then(setChatAndMessagges)
        .catch((e) => console.log("Errore fetch chatAndMessages: ", e))
        .finally(() => setLoading(false))
    }, [idChat]);


    return { chatAndMessagges, loading }
}