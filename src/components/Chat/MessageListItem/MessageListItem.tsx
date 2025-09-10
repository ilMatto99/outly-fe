import { Badge } from "@/components/ui/badge";
import Avatar from "../../Avatar/avatar";
import Icon from '../../Icon/Icon';
import { cn } from "@/lib/utils";
import './../../../index.css'

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
      className={cn(
        "flex items-center gap-3 border border-gray-100 p-3 transition-colors rounded-xl",
        "font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]",
        className
      )}
    >
      <Avatar src={avatarUrl} alt={`${chatName} Avatar`} />

      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <h3 className="truncate text-base font-semibold text-gray-800 max-w-[75%] sm:max-w-[85%]">
            {chatName}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {lastMessageTime}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          {isLastMessageSentByMe && statusIconName && (
            <Icon
              name={statusIconName}
              size={14}
              className={cn(
                lastMessageStatus === "checked"
                  ? "text-green-500"
                  : "text-gray-400"
              )}
            />
          )}
          <p className="truncate">{lastMessage}</p>
        </div>
      </div>

      {unreadCount !== undefined && unreadCount > 0 && (
        <Badge className="ml-2 flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold text-white bg-green-500">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default MessageListItem;
