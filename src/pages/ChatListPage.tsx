import MessageListItem from "@/components/Chat/MessageListItem/MessageListItem";
import { useChats } from "@/hooks/useChats";
import { timeCalculator } from "@/TimeCalculator/time";
import { useNavigate } from "react-router";

const ChatListPage = () => {

    const navigate = useNavigate();

    let idUtente = 12;

    const {chats,loading} = useChats(idUtente);

    const onClick = (id:string) => {
          navigate(`/chat/${id}`);
        };

    return (
  <>
    {loading ? (
      <p>Caricamento chat in corso...</p> // oppure uno Spinner
    ) : (
      chats.map((chat) => {

        const orario = timeCalculator(chat.dataUltimoMessaggio)

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

        return (
          <MessageListItem
            key={chat.id} 
            id={chat.id}
            chatName={chatName}
            avatarUrl={avatarUrl}
            lastMessage={chat.ultimoMessaggio}
            lastMessageTime={orario}
            onClick={() => onClick(chat.id)}
            isGroupChat={chat.gruppo}
          />
        );
      })
    )}
  </>
);
}

export default ChatListPage;