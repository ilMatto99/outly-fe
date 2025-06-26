import { cn } from '@/lib/utils';
import type { ElementType, SVGProps } from 'react';
import { BiCycling } from "react-icons/bi";
import { FaBookmark, FaRegBookmark, FaRegEye, FaRegEyeSlash, FaRunning, FaWalking } from 'react-icons/fa';
import { FiArrowLeft, FiCalendar, FiCamera, FiChevronDown, FiClock, FiEdit, FiHome, FiMapPin, FiMessageCircle, FiMoreHorizontal, FiPaperclip, FiPlayCircle, FiPlus, FiRefreshCcw, FiSearch, FiSend, FiShare2, FiStar, FiUser, FiUsers, FiX } from 'react-icons/fi';
import { LuCheck, LuCheckCheck, LuFilter } from 'react-icons/lu';
import { MdOutlineEuro, MdOutlineNordicWalking } from "react-icons/md";
import { RiPinDistanceLine, RiVerifiedBadgeLine } from "react-icons/ri";

const IconMap: { [key: string]: ElementType } = {
    'bookmark-empty': FaRegBookmark,
    'bookmark-full': FaBookmark,
    'user': FiUser,
    'plus': FiPlus,
    'home': FiHome,
    'message': FiMessageCircle,
    'walking': FaWalking,
    'bicycle': BiCycling,
    'running': FaRunning,
    'climbing': MdOutlineNordicWalking,
    'search': FiSearch,
    'filter': LuFilter,
    'arrow-left': FiArrowLeft,
    'map-pin': FiMapPin,
    'users': FiUsers,
    'more-horizontal': FiMoreHorizontal,
    'edit': FiEdit,
    'euro': MdOutlineEuro,
    'share': FiShare2,
    'refresh': FiRefreshCcw,
    'routes': RiPinDistanceLine,
    'time': FiClock,
    'star': FiStar,
    'arrow-down': FiChevronDown,
    'play': FiPlayCircle,
    'calendar': FiCalendar,
    'check-circle': RiVerifiedBadgeLine,
    'paperclip': FiPaperclip,
    'camera': FiCamera,
    'send': FiSend,
    'check': LuCheck,
    'double-check': LuCheckCheck,
    'eye': FaRegEye,
    'barred-eye': FaRegEyeSlash,
    'close': FiX
};

interface IconProps extends SVGProps<SVGSVGElement> {
    name: string;
    color?: string;
    size?: number;
}

const Icon = ({name, size=24, color='currentColor', className, ...props}: IconProps) => {
    const SvgComponent = IconMap[name];

    if(!SvgComponent) {
      console.warn(`Icon with name "${name}" not found in IconMap.`);
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("size-6 text-red-500", className)}
                {...props}
            >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
        );  
    }

    return (
        <SvgComponent 
            size={size}
            color={color}
            className={cn("size-6", className)}
            {...props}
        />
    )
}

export default Icon;