import * as React from "react"
import '../../index.css'
import { cn } from "@/lib/utils"
import IconButton from "../IconButton/IconButton"

interface TrailingIconItemProps {
  iconName: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline';
}

interface CommonInputProps {
  label: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  leadingIcon?: string;
  trailingIcons?: TrailingIconItemProps[];
  onLeadingIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface TextInputProps extends CommonInputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'message';
}

interface TextAreaInputProps extends CommonInputProps {
  type?: 'textarea',
  rows?: number;
  cols?: number;
}

type InputProps = TextInputProps | TextAreaInputProps;

function Input({ label, type = 'text', placeholder, onChange, disabled = false, required = false, readOnly = false, error = false, errorMessage, value, leadingIcon, trailingIcons = [], onLeadingIconClick, className, ...props }: InputProps) {
  const inputId = React.useId();

  const wrapperClasses = cn(
    "mb-6 w-full max-w-2xl",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const labelClasses = cn(
    "block mb-2 text-[#203D41] font-semibold text-sm-custom font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]",
    "flex items-center gap-1",
    disabled && "text-[#a0a0a0]",
  );

  const requiredAsteriskClasses = "text-[#c44b3e] text-base leading-none";

  const fieldContainerClasses = cn(
    "flex items-center border border-[#203D41] rounded-xl overflow-hidden transition-all bg-white",
    "px-2",
    "focus-within:outline-none focus-within:border-[#203D41] focus-within:shadow-md-primary",
    error && "border-[#c44b3e]",
    error && "focus-within:shadow-md-error focus-within:border-[#c44b3e]",
    disabled && "bg-[#f8f8f8] border-[#e0e0e0] cursor-not-allowed",
    readOnly && "bg-[#f0f0f0] border-[#d0d0d0] cursor-default",
    type === 'textarea' && 'rounded-[1rem]'
  );

  const inputFieldClasses = cn(
    "flex-grow border-none outline-none bg-transparent py-3 px-3",
    "font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif] text-base leading-normal text-[#203D41] box-border transition-colors",
    "placeholder:text-[rgba(32, 61, 65, 0.6)] placeholder:opacity-100",
    disabled && "text-[#a0a0a0] cursor-not-allowed appearance-none",
    readOnly && "text-[#203D41] cursor-default appearance-none",
    type === 'textarea' && 'resize-y min-h-[80px]'
  );


  const errorMessageClasses = "text-[#c44b3e] text-xs mt-1 block font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]";

  const iconBaseClasses = "text-[#203D41] border-none bg-transparent";

  const leadingIconClasses = cn("mr-2", iconBaseClasses);
  const trailingIconsContainerClasses = "flex items-center gap-1 ml-2";

  const commonInputProps = {
    id: inputId,
    placeholder,
    onChange,
    disabled,
    readOnly,
    required,
    className: inputFieldClasses,
    value: value,
    ...props,
  };

  return (
    <div className={wrapperClasses}>
      <label htmlFor={inputId} className={labelClasses}>
        {label}
        {required && (
          <span className={requiredAsteriskClasses}>*</span>
        )}
      </label>
      <div className={fieldContainerClasses}>
        {leadingIcon && (
          <IconButton
            iconName={leadingIcon}
            label={`Icona ${leadingIcon}`}
            size="small"
            variant={'default'}
            disabled={disabled}
            className={leadingIconClasses}
            onClick={onLeadingIconClick}
          />
        )}

        {type === 'textarea' ? (
          <textarea
            {...(commonInputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={(props as TextAreaInputProps).rows || 4}
            cols={(props as TextAreaInputProps).cols}
          />
        ) : (
          <input
            {...(commonInputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {trailingIcons && trailingIcons.length > 0 && (
          <div className={trailingIconsContainerClasses}>
            {trailingIcons.map((icon, index) => (
              <IconButton
                key={icon.iconName + index}
                iconName={icon.iconName}
                label={icon.label}
                onClick={icon.onClick}
                size="small"
                variant={'default'} 
                disabled={disabled || icon.disabled}
                className={iconBaseClasses}
              />
            ))}
          </div>
        )}
      </div>

      {error && errorMessage && (
        <span className={errorMessageClasses}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default Input;
