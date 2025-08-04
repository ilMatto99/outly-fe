import ChatHeader from "@/components/Chat/ChatHeader/ChatHeader";
import MessageListItem from "@/components/Chat/MessageListItem/MessageListItem";
import { useChat } from "@/hooks/useChat";
import { timeCalculator } from "@/TimeCalculator/time";
import { useNavigate, useParams } from "react-router";
import { cn } from "@/lib/utils";


const ChatPage = () => {

    const idUtente = 12;

    const {id} = useParams();

    if (!id) {
        return <p>ID non valido</p>;
    }
    
    const {chatAndMessagges,loading} = useChat(id);


    const navigate = useNavigate();

    const onBackClick = () => {
        navigate("/chat-list");
    }

    const onOptionsClick = () => {
        console.log("opzioni");
    }

    let userName!:string;
    let userAvatarUrl!:string;
    let count!:number;
    let isMessageByMe = false;
    let className:string|undefined = undefined;

    if(!chatAndMessagges?.chat.gruppo){ 
    chatAndMessagges?.chat.partecipanti.forEach((partecipante)=>{
        if (partecipante.idUtente != idUtente) {
            userName = partecipante.nome;
            userAvatarUrl = partecipante.avatarUrl;
        }
    })
    }   
    else{
        count=chatAndMessagges.chat.partecipanti.length;
    } 

    return(<>
    {!chatAndMessagges?.chat.gruppo ? (
        <ChatHeader onBackClick={onBackClick} onOptionsClick={onOptionsClick} type="individual" userName={userName} userAvatarUrl={userAvatarUrl} />
    ) : (
        <ChatHeader onBackClick={onBackClick} onOptionsClick={onOptionsClick} type="group" groupName={chatAndMessagges?.chat.nome} groupParticipants={{count}} groupAvatarUrl={chatAndMessagges.chat.immagine} />
    )
    }
    {chatAndMessagges?.messaggi.map((messaggio)=>{
        const sender = chatAndMessagges.chat.partecipanti.find(
            (partecipante) => partecipante.idUtente === messaggio.idSender
        );
        if(sender?.nome)
        userName = sender?.nome;
        if(sender?.avatarUrl)
        userAvatarUrl = sender?.avatarUrl;

        const isMessageByMe = messaggio.idSender === idUtente;
        className=cn(
            "max-w-[75%] p-3 rounded-xl mx-4",
            isMessageByMe ? "bg-[#cfe9ba]" : "bg-white"
        )

        const orario = timeCalculator(messaggio.dataInvio);

        
        
        return (
            <div
                key={messaggio.id}
                className={cn(
                    "w-full flex mt-2",  // qui aggiungo un margin-top uguale per tutti i messaggi
                    messaggio.idSender === idUtente ? "justify-end" : "justify-start"
                )}
            >
            <MessageListItem id={chatAndMessagges.chat.id} chatName={userName} avatarUrl={userAvatarUrl} lastMessage={messaggio.testo} lastMessageTime={orario} isLastMessageSentByMe={isMessageByMe} className={className} />
            </div>
        )
    }
    )
    }
    </>)
}

export default ChatPage;