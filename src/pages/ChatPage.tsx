import ChatHeader from "@/components/Chat/ChatHeader/ChatHeader";
import MessageListItem from "@/components/Chat/MessageListItem/MessageListItem";
import { useChat } from "@/hooks/useChat";
import { timeCalculator } from "@/TimeCalculator/time";
import { useNavigate, useParams } from "react-router";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface MessaggiDTO {
  idChat: string;
  idMittente: number;
  messaggio: string;
}

interface MessaggioRicevuto {
  idChat: string;
  idMittente: number;
  messaggio: string;
  dataInvio: string;
  id: string;
}

// Tipo uniforme per messaggi (storici + live)
interface MessaggioUniforme {
  id: string;
  idSender: number;
  testo: string;
  dataInvio: string;
}

const ChatPage = () => {
  const idUtente = 11;
  const { id } = useParams();

  if (!id) return <p>ID non valido</p>;

  const { chatAndMessagges } = useChat(id);
  const navigate = useNavigate();

  const onBackClick = () => navigate("/chat-list");
  const onOptionsClick = () => console.log("opzioni");

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messaggiLive, setMessaggiLive] = useState<MessaggioUniforme[]>([]);

    useEffect(() => {
    // Crea socket e client STOMP
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
        webSocketFactory: () => socket as any,
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
    });

    client.onConnect = () => {
        console.log("Connesso al WebSocket");
        // Sottoscrizione al topic dell'utente
        client.subscribe(`/topic/utente/${idUtente}`, (message) => {
        const body: MessaggioRicevuto = JSON.parse(message.body);
        // Aggiorna lo stato dei messaggi live
        setMessaggiLive((prev) => [
            ...prev,
            {
            id: body.id,
            idSender: body.idMittente,
            testo: body.messaggio,
            dataInvio: body.dataInvio,
            },
        ]);
        });
    };

    client.activate();
    setStompClient(client);

    // Cleanup: disconnetti il client quando il componente viene smontato
    return () => {
        client.deactivate();
    };
    }, [idUtente]);


  const inviaMessaggio = async (testo: string) => {
    if (!testo.trim()) return;

    const messaggiDto: MessaggiDTO = {
      idChat: id,
      idMittente: idUtente,
      messaggio: testo,
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat/inviaMessaggio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messaggiDto),
      });

      if (!response.ok) throw new Error("Errore durante l'invio del messaggio");
    } catch (err) {
      console.error("Errore invio messaggio", err);
    }
  };

  // Combina messaggi storici e live, uniformando i messaggi storici
  const messaggiStorici: MessaggioUniforme[] = chatAndMessagges?.messaggi.map((m) => ({
    id: m.id,
    idSender: m.idSender,
    testo: m.testo,
    dataInvio: m.dataInvio,
  })) || [];

  const messaggiTotali = [...messaggiStorici, ...messaggiLive];

  let userName!: string;
  let userAvatarUrl!: string;
  let count!: number;
  let isMessageByMe = false;
  let className: string | undefined = undefined;

  if (!chatAndMessagges?.chat.gruppo) {
    chatAndMessagges?.chat.partecipanti.forEach((partecipante) => {
      if (partecipante.idUtente !== idUtente) {
        userName = partecipante.nome;
        userAvatarUrl = partecipante.avatarUrl;
      }
    });
  } else {
    count = chatAndMessagges.chat.partecipanti.length;
  }

  return (
    <>
      {!chatAndMessagges?.chat.gruppo ? (
        <ChatHeader
          onBackClick={onBackClick}
          onOptionsClick={onOptionsClick}
          type="individual"
          userName={userName}
          userAvatarUrl={userAvatarUrl}
        />
      ) : (
        <ChatHeader
          onBackClick={onBackClick}
          onOptionsClick={onOptionsClick}
          type="group"
          groupName={chatAndMessagges?.chat.nome}
          groupParticipants={{ count }}
          groupAvatarUrl={chatAndMessagges.chat.immagine}
        />
      )}

      {messaggiTotali.map((messaggio) => {
        const sender = chatAndMessagges?.chat.partecipanti.find(
          (partecipante) => partecipante.idUtente === messaggio.idSender
        );
        if (sender?.nome) userName = sender.nome;
        if (sender?.avatarUrl) userAvatarUrl = sender.avatarUrl;

        isMessageByMe = messaggio.idSender === idUtente;
        className = cn("max-w-[75%] p-3 rounded-xl mx-4", isMessageByMe ? "bg-[#cfe9ba]" : "bg-white");
        const orario = timeCalculator(messaggio.dataInvio);

        return (
          <div
            key={messaggio.id}
            className={cn("w-full flex mt-2", messaggio.idSender === idUtente ? "justify-end" : "justify-start")}
          >
            <MessageListItem
              id={chatAndMessagges!.chat.id}
              chatName={userName}
              avatarUrl={userAvatarUrl}
              lastMessage={messaggio.testo}
              lastMessageTime={orario}
              isLastMessageSentByMe={isMessageByMe}
              className={className}
            />
          </div>
        );
      })}

      {/* Input per invio messaggi */}
      <div style={{ marginTop: 10, display: "flex", gap: "8px", padding: "0 16px" }}>
        <input
          type="text"
          style={{ flex: 1, padding: "5px" }}
          placeholder="Scrivi un messaggio..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              inviaMessaggio(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>('input[placeholder="Scrivi un messaggio..."]');
            if (input && input.value.trim()) {
              inviaMessaggio(input.value);
              input.value = "";
            }
          }}
        >
          Invia
        </button>
      </div>
    </>
  );
};

export default ChatPage;
