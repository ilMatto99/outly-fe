import MessageListItem from "@/components/Chat/MessageListItem/MessageListItem";
import { useChats } from "@/hooks/useChats";

const ChatListPage = () => {

    let idUtente = 12;

    const {chats,loading} = useChats(idUtente);

    return (
  <>
    {loading ? (
      <p>Caricamento chat in corso...</p> // oppure uno Spinner
    ) : (
      chats.map((chat) => {
        const orario = new Date(chat.dataUltimoMessaggio).toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        });

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
            key={chat.id} // sempre meglio inserire la chiave nel map
            id={chat.id}
            chatName={chatName}
            avatarUrl={avatarUrl}
            lastMessage={chat.ultimoMessaggio}
            lastMessageTime={orario}
          />
        );
      })
    )}
  </>
);
}

export default ChatListPage;