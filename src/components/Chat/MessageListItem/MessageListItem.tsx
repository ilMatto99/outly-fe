import { cn } from "@/lib/utils";
import Avatar from "../../Avatar/avatar";
import Icon from '../../Icon/Icon';
import { Badge } from "@/components/ui/badge";

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
    isGroupChat?: boolean;
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
        if (onClick) {
            onClick(id);
        }
    };

    const statusIconName = lastMessageStatus === 'checked' ? 'double-check' : (lastMessageStatus === 'delivered' ? 'check' : undefined);

    return (
        <div
            onClick={handleItemClick}
            className={cn(
                "flex w-full cursor-pointer items-center gap-3 border-b border-gray-100 bg-white p-3 transition-colors hover:bg-gray-50",
                "font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]",
                className
            )}
        >
            <Avatar src={avatarUrl} alt={`${chatName} Avatar`} />

            {/* Contenuto della chat (nome, ultimo messaggio) */}
            <div className="flex flex-col flex-grow min-w-0">
                <div className="flex items-center justify-between">
                    <h3 className="truncate text-base font-semibold text-gray-800">{chatName}</h3>
                    <span className="flex-shrink-0 text-xs text-gray-500">{lastMessageTime}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    {isLastMessageSentByMe && statusIconName && (
                        <Icon
                            name={statusIconName}
                            size={14}
                            className={cn(lastMessageStatus === 'checked' ? 'text-green-500' : 'text-gray-400')}
                        />
                    )}
                    <p className="truncate">{lastMessage}</p>
                </div>
            </div>

            {/* Contatore messaggi non letti */}
            {unreadCount !== undefined && unreadCount > 0 ? ( 
                <Badge className="ml-2 flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold text-white bg-green-500">
                    {unreadCount}
                </Badge>
            ) : null}
        </div>
    );
};

export default MessageListItem;