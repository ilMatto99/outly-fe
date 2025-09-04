import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// Tipi per le props del componente
interface ChatProps {
  userId: number;
  idChat: string;
}

// Tipo del messaggio
interface MessaggioDTO {
  idChat: string;
  idMittente: number;
  messaggio: string;
}

const ChatProva: React.FC<ChatProps> = ({ userId, idChat }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<MessaggioDTO[]>([]);
  const [text, setText] = useState("");

  // 🔌 Connessione WebSocket
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("Connesso!");
      // Sottoscrizione al topic dell'utente
      client.subscribe(`/topic/utente/${userId}`, (message) => {
        const msg: MessaggioDTO = JSON.parse(message.body);
        setMessages((prev) => [...prev, msg]);
      });
    };

    client.activate();
    setStompClient(client);

    // Cleanup quando il componente si smonta
    return () => {
      client.deactivate();
    };
  }, [userId]);

  // 📥 Carica messaggi iniziali dalla chat via REST
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/chat/caricaChatSingola?idChat=${idChat}`
        );
        const data = await res.json();
        setMessages(data.messaggi || []);
      } catch (error) {
        console.error("Errore nel caricamento messaggi:", error);
      }
    };

    fetchMessages();
  }, [idChat]);

  // ✉️ Invia messaggio
  const sendMessage = () => {
    if (stompClient && text.trim() !== "") {
      const messaggio: MessaggioDTO = {
        idChat: idChat,
        idMittente: userId,
        messaggio: text,
      };

      stompClient.publish({
        destination: "/app/invia-messaggio",
        body: JSON.stringify(messaggio),
      });

      setText("");
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "8px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.idMittente}:</strong> {msg.messaggio}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Scrivi un messaggio..."
      />
      <button onClick={sendMessage}>Invia</button>
    </div>
  );
};

export default ChatProva;
