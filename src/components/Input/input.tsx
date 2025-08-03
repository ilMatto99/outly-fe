import * as React from "react"
import '../../index.css'
import './input.css'
import { cn } from "@/lib/utils"
import IconButton from "../IconButton/IconButton"
import type { InputProps, TextAreaInputProps, TrailingIconItemProps } from "./InputType";
import { usePasswordToggle, validateEmail } from "./useInput"

function Input({
  label,
  type = 'text',
  placeholder,
  onChange,
  onClick,
  disabled = false,
  required = false,
  readOnly = false,
  error = false,
  errorMessage,
  value,
  leadingIcon,
  trailingIcons = [],
  onLeadingIconClick,
  onKeyDown,
  className,
  ...props
}: InputProps) {
  const inputId = React.useId();
  const [localError, setLocalError] = React.useState<string | null>(null);

  // Gestione password toggle
  const isPassword = type === 'password';
  const { inputType, toggleVisibility } = usePasswordToggle("password");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (type === 'email' && e.target.value && !validateEmail(e.target.value)) {
      setLocalError("Formato email non valido!")
    } else {
      setLocalError(null);
    }
  }

  // Icona occhio per type password
  const showPasswordIcon: TrailingIconItemProps = {
    iconName: inputType === 'password' ? 'eye' : 'eye-slash',
    label: inputType === 'password' ? 'Mostra password' : 'Nascondi password',
    onClick: toggleVisibility,
  }

  const allTrailingIcons = isPassword
    ? [...trailingIcons, showPasswordIcon]
    : trailingIcons;

  const wrapperClasses = cn(
    "input-wrapper",
    disabled && "disabled",
    className
  );

  const labelClasses = cn(
    "input-label",
    disabled && "disabled",
  );

  const requiredAsteriskClasses = "input-required-asterisk";

  const fieldContainerClasses = cn(
    "input-field-container",
    error && "error",
    disabled && "disabled",
    readOnly && "readonly",
    type === 'textarea' && 'textarea'
  );

  const inputFieldClasses = cn(
    "input-field",
    disabled && "disabled",
    readOnly && "readonly",
    type === 'textarea' && 'textarea'
  );

  const errorMessageClasses = "input-error-message";

  const iconBaseClasses = "input-icon-base";

  const leadingIconClasses = cn("input-leading-icon", iconBaseClasses);
  const trailingIconsContainerClasses = "input-trailing-icons-container";

  const commonInputProps = {
    id: inputId,
    placeholder,
    onChange,
    onClick,
    disabled,
    readOnly,
    required,
    onKeyDown,
    className: inputFieldClasses,
    value,
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
            onKeyDown={() => onKeyDown}
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
            type={isPassword ? inputType : type}
            onBlur={handleBlur}
          />
        )}

        {allTrailingIcons.length > 0 && (
          <div className={trailingIconsContainerClasses}>
            {allTrailingIcons.map((icon, index) => (
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

      {(error && errorMessage) || localError && (
        <span className={errorMessageClasses}>
          {errorMessage || localError}
        </span>
      )}
    </div>
  )
}

export default Input;
