import MessageListItem from "@/components/Chat/MessageListItem/MessageListItem";
import { useChatList } from "@/hooks/useChatList";
import type { Chat } from "@/types/ChatList";

type ChatListProps = {
    idUtente:number;
}

const ChatList = ({idUtente}:ChatListProps) => {

    const {chats, loading} = useChatList(idUtente);
    if (loading) return <div>Caricamento chat...</div>;

    
    const timeCalculator = (time:string) =>  new Date(time).toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        });

    const onClick= (id:string) => {
        return null;
    }

    return(<div>
            {chats.length === 0 ? (
                <div>Nessuna chat disponibile</div>
            ) : (

                    chats.map((chat)=>{

                        const orario = timeCalculator(chat.dataUltimoMessaggio);

                        let chatName: string = "nome";
                        let avatarUrl: string = "avatar";

                        if (chat.gruppo) {
                        chatName = chat.nome;
                        avatarUrl = chat.immagine;
                        } else {
                        chat.partecipanti.forEach((partecipante) => {
                            if (partecipante.idUtente !== idUtente) {
                            chatName = partecipante.nome;
                            avatarUrl = partecipante.avatarUrl;
                            }
                        });
                        }

                        return(<MessageListItem key={chat.id} id={chat.id} chatName={chatName} avatarUrl={avatarUrl} 
                            lastMessage={chat.ultimoMessaggio} lastMessageTime={orario} onClick={() => onClick(chat.id)}  />)
                    })
                
            )}
        </div>)
}

export default ChatList;