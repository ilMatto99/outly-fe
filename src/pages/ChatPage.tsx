/* eslint-disable react-hooks/rules-of-hooks */
import ChatHeader from "@/components/Chat/ChatHeader/ChatHeader";
import ChatMessage from "@/components/Chat/ChatMessage/ChatMessage";
import Input from "@/components/Input/input";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { timeCalculator } from "@/TimeCalculator/time";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SockJS from "sockjs-client";


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
  const {userId} = useAuth() ;
  
    const idUtente = userId; 
  
    if (idUtente === null) {
      return <p>Utente non loggato</p>;
    }
    
  const { id } = useParams();

  // Controllo anticipato per ID non valido
  if (!id) return <p>ID non valido</p>;

  // Chiamata dell'hook all'inizio del componente
  const { chatAndMessagges } = useChat(id);
  const navigate = useNavigate();

  const onBackClick = () => navigate("/chat-list");
  const onOptionsClick = () => console.log("opzioni");

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messaggiLive, setMessaggiLive] = useState<MessaggioUniforme[]>([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connesso al WebSocket");
      client.subscribe(`/topic/utente/${idUtente}`, (message) => {
        const body: MessaggioRicevuto = JSON.parse(message.body);
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
      setMessageText(""); // Resetta l'input dopo l'invio
    } catch (err) {
      console.error("Errore invio messaggio", err);
    }
  };

  const messaggiStorici: MessaggioUniforme[] = chatAndMessagges?.messaggi.map((m) => ({
    id: m.id,
    idSender: m.idSender,
    testo: m.testo,
    dataInvio: m.dataInvio,
  })) || [];

  const messaggiTotali = [...messaggiStorici, ...messaggiLive];

  let chatName = "";
  let chatAvatarUrl = "";
  let participantsCount = 0;

  if (!chatAndMessagges?.chat.gruppo) {
    const otherParticipant = chatAndMessagges?.chat.partecipanti.find(
      (partecipante) => partecipante.idUtente !== idUtente
    );
    chatName = otherParticipant?.nome || "";
    chatAvatarUrl = otherParticipant?.avatarUrl || "";
  } else {
    chatName = chatAndMessagges.chat.nome || "Gruppo";
    chatAvatarUrl = chatAndMessagges.chat.immagine || "";
    participantsCount = chatAndMessagges.chat.partecipanti.length;
  }

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* Header fisso in alto */}
        <div className="fixed top-0 left-0 w-full z-50">
          {!chatAndMessagges?.chat.gruppo ? (
            <ChatHeader
              onBackClick={onBackClick}
              onOptionsClick={onOptionsClick}
              type="individual"
              userName={chatName}
              userAvatarUrl={chatAvatarUrl}
            />
          ) : (
            <ChatHeader
              onBackClick={onBackClick}
              onOptionsClick={onOptionsClick}
              type="group"
              groupName={chatName}
              groupParticipants={{ count: participantsCount }}
              groupAvatarUrl={chatAvatarUrl}
            />
          )}
        </div>

        {/* Contenitore dei messaggi con margine superiore */}
        <div className="flex-1 overflow-y-auto mt-[100px] mb-[80px] items-center justify-center" style={{marginBottom: "100px"}}>
          {messaggiTotali.map((messaggio) => {
            const isMessageByMe = messaggio.idSender === idUtente;
            const sender = chatAndMessagges?.chat.partecipanti.find(
              (partecipante) => partecipante.idUtente === messaggio.idSender
            );
            const orario = timeCalculator(messaggio.dataInvio);

            return (
              <ChatMessage
                key={messaggio.id}
                message={messaggio.testo}
                time={orario}
                type={isMessageByMe ? "sent" : "received"}
                sender={sender?.nome}
                avatarUrl={sender?.avatarUrl}
              />
            );
          })}
        </div>

        {/* Input fisso in basso */}
        <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white p-4">
          <Input
            type="text"
            label=""
            placeholder="Scrivi un messaggio..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                inviaMessaggio(messageText);
              }
            }}
            leadingIcon="paperclip"
            trailingIcons={[
              { iconName: "camera", label: "Allega foto" },
              {
                iconName: "send",
                label: "Invia messaggio",
                onClick: () => inviaMessaggio(messageText),
                disabled: !messageText.trim(),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ChatPage;