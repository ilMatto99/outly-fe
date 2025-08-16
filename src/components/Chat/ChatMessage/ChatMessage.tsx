import { cn } from "@/lib/utils";
import Avatar from "../../Avatar/avatar";
import Icon from '../../Icon/Icon';
import "../../../index.css"

/**
 * Componente riutilizzabile per un singolo messaggio di chat.
 *
 * Renderizza una "bolla" di messaggio che può essere di tipo `sent` (inviato) o `received`
 * (ricevuto). A seconda del tipo, posiziona l'avatar del mittente (se disponibile),
 * il nome del mittente, il testo del messaggio, l'orario e lo stato di lettura/consegna.
 * Supporta anche un badge speciale per l'organizzatore.
 */

const messageColors = {
  sent: 'bg-[#e2fddf] text-[#333]',
  received: 'bg-white text-[#333]',
};

const badgeColors = {
  organizer: 'text-[#4CAF50]', 
};

type ChatMessageProps = {
  message: string;
  time: string;
  type: 'sent' | 'received';
  sender?: string; 
  avatarUrl?: string; 
  readStatusIcon?: 'checked' | 'delivered'; 
  isOrganizer?: boolean; 
};

const ChatMessage = ({ message, time, type, sender, avatarUrl, readStatusIcon = 'delivered', isOrganizer }: ChatMessageProps) => {
  const isReceived = type === 'received';
  const isSent = type === 'sent';

  const statusIconName = readStatusIcon === 'checked' ? 'double-check' : (readStatusIcon === 'delivered' ? 'check' : undefined);

  return (
    <div
      className={cn(
        "relative mb-2 flex w-auto max-w-[75%] font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]",
        isReceived ? "justify-start self-start" : "flex-row-reverse self-end"
      )}
    >
      {/* Colonna per Avatar (sinistra o destra) */}
      {(isReceived && avatarUrl) && ( 
        <div className="flex-shrink-0 pr-1 pb-2">
          <Avatar
            src={avatarUrl}
            alt={`${sender || 'Utente'} Avatar`}
          />
        </div>
      )}

      {/* Contenuto della chat: nome, bolla */}
      <div className={cn(
        "flex flex-col flex-grow",
        isSent ? "items-end" : "items-start" 
      )}>
        {/* Intestazione del mittente (Nome e badge Organizzatore) */}
        {(isReceived && sender) && (
          <div className="mb-0.5 flex items-center gap-1 self-start">
            <span className="text-sm font-semibold text-gray-700">{sender}</span>
            {isOrganizer && (
              <Icon name="badge" size={14} className={cn("ml-0.5 flex-shrink-0", badgeColors.organizer)} />
            )}
          </div>
        )}

        {/* La bolla di messaggio vera e propria */}
        <div
          className={cn(
            "relative flex min-w-[40px] max-w-full flex-col rounded-xl p-3 shadow-sm", 
            isReceived ? cn(messageColors.received, "rounded-bl-md") : cn(messageColors.sent, "rounded-br-md") 
          )}
        >
          <p className="pb-4 text-base leading-normal">{message}</p> 
          <div
            className={cn(
              "absolute bottom-1 right-2 flex items-center gap-0.5 text-xs text-gray-500",
              "bg-inherit pl-1" 
            )}
          >
            <span className="text-[0.75rem] text-gray-500">{time}</span>
            {isSent && statusIconName && ( 
              <Icon
                name={statusIconName}
                size={14}
                className={cn(readStatusIcon === 'checked' ? 'text-green-500' : 'text-gray-400')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;