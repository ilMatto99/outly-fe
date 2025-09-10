import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import "../../index.css";
import './radio-group.css'

/**
 * Componenti riutilizzabili per un gruppo di radio button.
 *
 * RadioGroup e RadioGroupItem sono costruiti su Radix UI per garantire
 * accessibilità e comportamento corretto. Lo stile ora è basato su Bootstrap 5,
 * con qualche regola custom in CSS per replicare i dettagli di Tailwind.
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={`d-grid gap-3 ${className || ""}`}
      {...props}
    />
  );
}

interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  label: string;
}

function RadioGroupItem({ label, className, ...props }: RadioGroupItemProps) {
  const id = React.useId();

  return (
    <div className="d-flex align-items-center mb-3 cursor-pointer">
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        id={id}
        className={`radio-size position-relative d-inline-block border-2 rounded-circle me-2-5 flex-shrink-0 bg-white border-custom focus-ring ${className || ""}`}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="position-relative d-flex align-items-center justify-content-center"
        >
          <CircleIcon className="radio-dot-size d-block bg-custom rounded-circle position-absolute top-50 start-50 translate-middle" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label
        htmlFor={id}
        className="fw-normal fs-6 text-custom d-flex align-items-center cursor-pointer font-nunito"
      >
        {label}
      </label>
    </div>
  );
}

export { RadioGroup, RadioGroupItem };
