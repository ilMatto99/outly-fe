import * as React from "react";
import Avatar from "./avatar"; 
import { cn } from "@/lib/utils";
import "../../index.css"

interface UserData {
  id: string;
  name: string;
  image?: string;
}

interface AvatarListProps extends React.HTMLAttributes<HTMLDivElement> {
  users: UserData[];
  maxDisplay: number;
  avatarSize?: 'sm' | 'md' | 'lg' | 'custom';
  customSizeClass?: string;
}

/**
 * Componente riutilizzabile per visualizzare una lista di avatar.
 *
 * Mappa un array di oggetti utente e renderizza un componente `Avatar` per ciascuno.
 * Se il numero di utenti supera `maxDisplay`, l'ultimo avatar viene sostituito
 * con un avatar di conteggio che indica quanti utenti aggiuntivi ci sono.
 * Supporta varie dimensioni predefinite e personalizzate.
 */
const AvatarList = ({
  users,
  maxDisplay,
  avatarSize = 'md',
  customSizeClass,
  className,
  ...props
}: AvatarListProps) => {
  const displayedUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - displayedUsers.length;

  const sizeClasses = {
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
    custom: '', 
  };

  const currentAvatarSizeClass = avatarSize === 'custom' ? customSizeClass : sizeClasses[avatarSize];

  return (
    <div className={cn("flex -space-x-2.5 rtl:space-x-reverse", className)} {...props}>
      {displayedUsers.map((user) => (
        <Avatar
          key={user.id}
          type={user.image ? "image" : "text"}
          src={user.image}
          alt={user.name}
          fallbackText={user.name.charAt(0).toUpperCase()}
          className={cn("border-2 border-white dark:border-gray-950", currentAvatarSizeClass)}
        />
      ))}
      {remainingCount > 0 && (
        <Avatar
          type="text" 
          count={remainingCount} 
          className={cn("border-2 border-white dark:border-gray-950", currentAvatarSizeClass)}
        />
      )}
    </div>
  );
};

export default AvatarList;