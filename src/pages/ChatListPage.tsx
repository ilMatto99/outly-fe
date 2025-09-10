import MessageListItem from "@/components/Chat/MessageListItem/MessageListItem";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useChats } from "@/hooks/useChats";
import { timeCalculator } from "@/TimeCalculator/time";
import { useNavigate } from "react-router";

const ChatListPage = () => {

  const navigate = useNavigate();

  const idUtente = 12;

  const { chats, loading } = useChats(idUtente);

  const onClick = (id: string) => {
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
            <div className="relative min-h-screen flex flex-col">
              <div className="fixed top-0 left-0 w-full z-50">
                <Navbar variant="primary" />
              </div>
              <div style={{
                padding: '0px',
                width: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                marginTop: "80px"
              }}>
                <MessageListItem
                  key={chat.id}
                  id={chat.id}
                  chatName={chatName}
                  avatarUrl={avatarUrl}
                  lastMessage={chat.ultimoMessaggio}
                  lastMessageTime={orario}
                  onClick={() => onClick(chat.id)}
                /* isGroupChat={chat.gruppo} */
                />
              </div>
              <Footer />
            </div>
          );
        })
      )}
    </>
  );
}

export default ChatListPage;