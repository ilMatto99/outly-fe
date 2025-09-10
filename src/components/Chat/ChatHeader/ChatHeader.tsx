import IconButton from '../../IconButton/IconButton';
import Avatar from "../../Avatar/avatar";
import './../../../index.css'

/**
 * Componente riutilizzabile per l'intestazione di una chat.
 *
 * Supporta due tipi di chat: individuale o di gruppo. A seconda del tipo,
 * mostra le informazioni pertinenti (nome utente, avatar, conteggio partecipanti)
 * e include pulsanti per tornare indietro e per le opzioni della chat.
 */
interface GroupParticipants {
  count: number;
}

interface ChatHeaderProps {
  onBackClick?: () => void;
  onOptionsClick?: () => void;
  type: 'individual' | 'group';
  userName?: string;
  userAvatarUrl?: string;
  groupName?: string;
  groupParticipants?: GroupParticipants;
  groupAvatarUrl?: string; 
  className?: string; 
}

const ChatHeader = ({
  onBackClick,
  onOptionsClick,
  type,
  userName,
  userAvatarUrl,
  groupName,
  groupParticipants,
  groupAvatarUrl,
  className
}: ChatHeaderProps) => {
  const isIndividual = type === 'individual';
  const isGroup = type === 'group';

  return (
    <div
      className={`d-flex align-items-center justify-content-between border-bottom bg-white p-3 shadow-sm font-nunito ${className || ""}`}
    >
      {/* Sezione sinistra */}
      <div className="d-flex align-items-center gap-3">
        <IconButton
          variant="default"
          size="medium"
          onClick={onBackClick}
          label="Torna indietro"
          iconName="arrow-left"
          className="text-custom"
        />

        {isIndividual && userName && (
          <>
            <Avatar src={userAvatarUrl} alt={`${userName} Avatar`} />
            <span className="fs-5 fw-semibold text-dark">{userName}</span>
          </>
        )}

        {isGroup && groupName && (
          <>
            <Avatar src={groupAvatarUrl} alt={`${groupName} Avatar`} />
            <div className="d-flex flex-column">
              <span className="fs-5 fw-semibold text-dark">{groupName}</span>
              {groupParticipants && (
                <span className="small text-muted">
                  {groupParticipants.count} partecipanti
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Sezione destra */}
      <IconButton
        variant="default"
        size="medium"
        onClick={onOptionsClick}
        label="Opzioni chat"
        iconName="more-vertical"
        className="text-custom"
      />
    </div>
  );
};

export default ChatHeader;
