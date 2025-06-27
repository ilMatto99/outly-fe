import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import '../../index.css'

import { cn } from "@/lib/utils"

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  type?: 'image' | 'text'; 
  src?: string; 
  alt?: string; 
  fallbackText?: string; 
  count?: number;
}

function Avatar({
  className,
  type = 'image',
  src,
  alt,
  fallbackText,
  count,
  ...props
}: AvatarProps) {
  const baseRootClasses = "relative flex size-10 shrink-0 overflow-hidden rounded-full";

  const getTextSize = (currentClassName: string | undefined) => {
    if(!currentClassName) return "text-base"

    if(currentClassName.includes("size-6")) return "text-[0.6rem]"
    if(currentClassName.includes("size-8")) return "text-xs"
    if(currentClassName.includes("size-10")) return "text-sm"
    if(currentClassName.includes("size-12")) return "text-base"
    if(currentClassName.includes("size-16")) return "text-lg"

    return "text-sm"
  }

  const currentTextSizeClass = getTextSize(className);

  //const fallbackCountClasses = "bg-[#203D41] text-white flex size-full items-center justify-center rounded-full font-medium";

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        baseRootClasses,
        className
      )}
      {...props}
    >
      {type === 'image' && src ? (
        <>
          <AvatarImage 
            data-slot="avatar-image"
            src={src}
            alt={alt}
            />
            <AvatarFallback
            data-slot="avatar-fallback"
            className={cn(
              "bg-muted flex size-full items-center justify-center rounded-full text-gray-700 dark:text-gray-300",
              currentTextSizeClass,
              "font-semibold"
            )}
          >
            {fallbackText?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </>
      ) : (
        <AvatarFallback
          data-slot="avatar-fallback"
          className={cn(count !== undefined ? "bg-[#203D41] text-white" : "bg-muted text-gray-700 dark:text-gray-300", currentTextSizeClass,
          "font-semibold"
          )} 
        >
          {count !== undefined ? `+${count}` : fallbackText?.charAt(0).toUpperCase()} 
        </AvatarFallback>
      )}
    </AvatarPrimitive.Root>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export default Avatar
