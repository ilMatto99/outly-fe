import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import '../../index.css'

import { cn } from "@/lib/utils"

interface ButtonProps extends React.ComponentProps<"button"> {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  asChild?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[20px] text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 line-height-1 cursor-pointer [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#203D41] text-white shadow-xs hover:bg-[#6D7E81]",
        outline:
          "bg-transparent text-[#203D41] border-2 border-[#203D41] hover:bg-[#203D41]",
        secondary:
          "bg-[#DFE3D0] text-black shadow-xs hover:bg-[#9EA193]",
        link: "text-[#203D41] underline-offset-4 hover:underline bg-transparent border-none italic",
      },
      size: {
        small: "text-[12px] py-[10px] px-[16px]",
        medium: "text-[14px] py-[11px] px-[20px]",
        large: "text-[16px] py-[12px] px-[24px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  label,
  onClick,
  disabled,
  ...props
}: ButtonProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </Comp>
  )
}

export default Button;
