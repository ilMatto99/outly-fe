import Avatar from "../../Avatar/avatar";
import Icon from '../../Icon/Icon';
import './chat-message.css'

/**
 * Componente riutilizzabile per un singolo messaggio di chat.
 *
 * Renderizza una "bolla" di messaggio che può essere di tipo `sent` (inviato) o `received`
 * (ricevuto). A seconda del tipo, posiziona l'avatar del mittente (se disponibile),
 * il nome del mittente, il testo del messaggio, l'orario e lo stato di lettura/consegna.
 * Supporta anche un badge speciale per l'organizzatore.
 */

type ChatMessageProps = {
  message: string;
  time: string;
  type: 'sent' | 'received';
  sender?: string;
  avatarUrl?: string;
  readStatusIcon?: 'checked' | 'delivered';
  isOrganizer?: boolean;
};

const ChatMessage = ({
  message,
  time,
  type,
  sender,
  avatarUrl,
  readStatusIcon = 'delivered',
  isOrganizer
}: ChatMessageProps) => {
  const isReceived = type === 'received';
  const isSent = type === 'sent';

  const statusIconName =
    readStatusIcon === 'checked'
      ? 'double-check'
      : readStatusIcon === 'delivered'
        ? 'check'
        : undefined;

  return (
    <div
      className={`chat-message d-flex mb-3 ${isSent ? "sent" : "received"}`}
    >
      {/* Avatar a sinistra per i ricevuti */}
      {isReceived && avatarUrl && (
        <div className="chat-avatar left">
          <Avatar src={avatarUrl} alt={`${sender || "Utente"} Avatar`} />
        </div>
      )}

      <div className={`chat-bubble-container ${isSent ? "align-right" : "align-left"}`}>
        {isReceived && sender && (
          <div className="chat-sender">
            <span>{sender}</span>
            {isOrganizer && (
              <Icon name="badge" size={14} className="ms-1 text-primary" />
            )}
          </div>
        )}

        <div className={`chat-bubble ${isSent ? "bubble-sent" : "bubble-received"}`}>
          <p className="chat-text">{message}</p>
          <div className="chat-time">
            <span>{time}</span>
            {isSent && statusIconName && (
              <Icon
                name={statusIconName}
                size={14}
                className={readStatusIcon === 'checked' ? 'text-success' : 'text-secondary'}
              />
            )}
          </div>
        </div>
      </div>
      {/* Avatar a destra per i messaggi inviati */}
      {isSent && avatarUrl && (
        <div className="chat-avatar right">
          <Avatar src={avatarUrl} alt="Tu" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;