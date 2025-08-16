import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import '../../index.css'

import { cn } from "@/lib/utils"

/**
 * Componenti riutilizzabili per un gruppo di radio button.
 *
 * `RadioGroup` e `RadioGroupItem` sono costruiti su `Radix UI` per garantire
 * l'accessibilità e il corretto comportamento di navigazione. Permettono
 * la selezione di un'unica opzione da un set di scelte.
 * Lo stile è personalizzato tramite classi Tailwind.
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

interface RadioGroupItemProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  label: string;
}

function RadioGroupItem({
  label,
  className,
  ...props
}: RadioGroupItemProps) {
  const indicatorClasses = cn(
    "relative inline-block size-5 border-2 rounded-full mr-2.5 transition-all flex-shrink-0 box-border bg-white",
    "border-[#203D41]",
    "data-[state=unchecked]:hover:after:scale-60 data-[state=unchecked]:hover:after:opacity-50",
    "focus-visible:ring-[3px] focus-visible:ring-[#203D41]/50 outline-none",
    "data-[state=checked]:border-[#203D41] data-[state=checked]:bg-white",
    "data-[disabled]:opacity-60 data-[disabled]:cursor-not-allowed",
    "data-[disabled]:border-[#e0e0e0] data-[disabled]:bg-[#203D41]",
    "data-[disabled]:data-[state=checked]:border-[#c0c0c0] data-[disabled]:data-[state=checked]:bg-white",
    className
  );

  const indicatorDotClasses = cn(
    "block size-2.5 bg-[#203d41] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform",
    "data-[state=checked]:scale-100",
    "data-[disabled]:data-[state=checked]:bg-[#c0c0c0]",
    className
  );

  const labelClasses = cn(
    "font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif] text-base text-[#203D41] cursor-pointer flex items-center",
    "data-[disabled]:opacity-60 data-[disabled]:text-[#a0a0a0]",
    className
  );

  const wrapperClasses = "flex items-center mb-3 cursor-pointer";

  const id = React.useId();

  return (
    <div className={wrapperClasses}>
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        id={id}
        className={indicatorClasses}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        >
          <CircleIcon className={indicatorDotClasses} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label htmlFor={id} className={labelClasses}>{label}</label>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
