import { Badge } from "@/components/ui/badge";
import Avatar from "../../Avatar/avatar";
import Icon from '../../Icon/Icon';
import './../../../index.css'

/**
 * Componente riutilizzabile per un singolo elemento di una lista di chat.
 *
 * Mostra un'anteprima di una chat (individuale o di gruppo) includendo l'avatar,
 * il nome, l'ultimo messaggio, l'orario e il conteggio dei messaggi non letti.
 * Se l'ultimo messaggio è stato inviato dall'utente corrente, mostra anche
 * lo stato di consegna/lettura.
 */

interface MessageListItemProps {
  id: string;
  onClick?: (id: string) => void;
  chatName: string;
  avatarUrl?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  isLastMessageSentByMe?: boolean;
  lastMessageStatus?: 'checked' | 'delivered';
  className?: string;
}

const MessageListItem = ({
  id,
  onClick,
  chatName,
  avatarUrl,
  lastMessage,
  lastMessageTime,
  unreadCount,
  isLastMessageSentByMe = false,
  lastMessageStatus,
  className
}: MessageListItemProps) => {
  const handleItemClick = () => {
    if (onClick) onClick(id);
  };

  const statusIconName =
    lastMessageStatus === 'checked'
      ? 'double-check'
      : lastMessageStatus === 'delivered'
      ? 'check'
      : undefined;

  return (
    <div
      onClick={handleItemClick}
      className={`d-flex w-100 cursor-pointer align-items-center gap-3 border-bottom bg-white p-3 transition hover-bg-light font-nunito ${className || ""}`}
    >
      <Avatar src={avatarUrl} alt={`${chatName} Avatar`} />

      <div className="d-flex flex-column flex-grow-1 min-w-0">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="text-truncate fs-6 fw-semibold text-dark mb-0">{chatName}</h3>
          <span className="flex-shrink-0 small text-muted">{lastMessageTime}</span>
        </div>
        <div className="d-flex align-items-center gap-1 text-muted small">
          {isLastMessageSentByMe && statusIconName && (
            <Icon
              name={statusIconName}
              size={14}
              className={lastMessageStatus === 'checked' ? 'text-success' : 'text-secondary'}
            />
          )}
          <p className="text-truncate mb-0">{lastMessage}</p>
        </div>
      </div>

      {unreadCount !== undefined && unreadCount > 0 && (
        <Badge className="success ms-2 pill" >
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default MessageListItem;
