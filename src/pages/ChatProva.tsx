import React, { useEffect, useState } from "react";
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
}

const Chat: React.FC<{ userId: number; chatId: string }> = ({ userId, chatId }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messaggi, setMessaggi] = useState<MessaggioRicevuto[]>([]);
  const [nuovoMessaggio, setNuovoMessaggio] = useState("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connesso al WebSocket");
      client.subscribe(`/topic/utente/${userId}`, (message) => {
        const body: MessaggioRicevuto = JSON.parse(message.body);
        setMessaggi((prev) => [...prev, body]);
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [userId]);

  const inviaMessaggio = async () => {
    if (!nuovoMessaggio.trim()) return;

    const messaggiDto: MessaggiDTO = {
      idChat: chatId,
      idMittente: userId,
      messaggio: nuovoMessaggio,
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat/inviaMessaggio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messaggiDto),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio del messaggio");
      }

      setNuovoMessaggio("");
    } catch (err) {
      console.error("Errore invio messaggio", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>
      <div style={{ border: "1px solid gray", padding: 10, height: 200, overflowY: "scroll" }}>
        {messaggi.map((m, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            <strong>{m.idMittente === userId ? "Tu" : "Utente " + m.idMittente}:</strong> {m.messaggio}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: "8px" }}>
        <input
          type="text"
          style={{ flex: 1, padding: "5px" }}
          placeholder="Scrivi un messaggio..."
          value={nuovoMessaggio}
          onChange={(e) => setNuovoMessaggio(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && inviaMessaggio()}
        />
        <button onClick={inviaMessaggio}>Invia</button>
      </div>

    </div>
  );
};

export default Chat;
