import IconButton from '../../IconButton/IconButton';
import { cn } from "@/lib/utils";
import Avatar from "../../Avatar/avatar";


interface GroupParticipants {
    count: number;
}

interface ChatHeaderProps {
    onBackClick?: () => void;
    onOptionsClick?: () => void;
    type: 'individual' | 'group';
    // Props specifiche per la chat individuale
    userName?: string;
    userAvatarUrl?: string;
    // Props specifiche per la chat di gruppo
    groupName?: string;
    groupParticipants?: GroupParticipants;
    groupAvatarUrl?: string; 
    className?: string; 
}

const ChatHeader= ({
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
            className={cn(
                "flex items-center justify-between border-b border-gray-200 bg-white p-3 shadow-sm",
                "font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]",
                className
            )}
        >
            {/* Left Section: Back Button and Avatar/Info */}
            <div className="flex items-center gap-3">
                <IconButton variant="default" size="medium" onClick={onBackClick} label="Torna indietro" iconName='arrow-left' className="text-[#203D41]">
                </IconButton>

                {isIndividual && userName && (
                    <>
                        <Avatar src={userAvatarUrl} alt={`${userName} Avatar`} />
                        <span className="text-lg font-semibold text-gray-800">{userName}</span>
                    </>
                )}

                {isGroup && groupName && (
                    <>
                        {/* Se il gruppo ha un'immagine specifica, la mostriamo, altrimenti un placeholder */}
                        <Avatar src={groupAvatarUrl} alt={`${groupName} Avatar`}  />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-800">{groupName}</span>
                            {groupParticipants && (
                                <span className="text-sm text-gray-500">{groupParticipants.count} partecipanti</span>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Right Section: Options Button */}
            <IconButton variant="default" size="medium" onClick={onOptionsClick} label="Opzioni chat" iconName='more-vertical' className="text-[#203D41]">
            </IconButton>
        </div>
    );
};

export default ChatHeader;