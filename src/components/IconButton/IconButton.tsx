import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Icon from "../Icon/Icon";
import '../../index.css'

interface IconButtonProps extends React.ComponentProps<"button"> {
    iconName: string;
    label: string;
    iconColor?: string;
    iconSize?: number;
    asChild?: boolean;
}

const iconButtonVariants = cva(
    "inline-flex items-center justify-center rounded-full transition-all disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-transparent text-[#203D41] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#203D41]/30",
                outline:
                    "bg-transparent text-[#203D41] border-2 border-[#203D41] hover:bg-[#203D41]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#203D41]/30",
            },
            size: {
                small: "size-8",
                medium: "size-10",
                large: "size-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "medium",
        },
    }
)

function IconButton({
    className,
    variant,
    size,
    iconName,
    label,
    iconColor,
    iconSize,
    asChild = false,
    ...props
}: IconButtonProps & VariantProps<typeof iconButtonVariants>) {
    const Comp = asChild ? Slot : "button";

    const resolvedIconSize = iconSize || (
                             size === 'small' ? 16 :
                             size === 'large' ? 28 :
                             20
    );

    return (
        <Comp
            type="button"
            aria-label={label}
            className={cn(iconButtonVariants({ variant, size, className }))}
            {...props}
        >
            <Icon
                name={iconName}
                size={resolvedIconSize}
                color={iconColor || 'currentColor'}
            />
        </Comp>
    )
}

export default IconButton;