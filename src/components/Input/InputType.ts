export interface TrailingIconItemProps {
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
  className?: string;
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

export interface TextInputProps extends CommonInputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'message';
}

export interface TextAreaInputProps extends CommonInputProps {
  type?: 'textarea',
  rows?: number;
  cols?: number;
}

export type InputProps = TextInputProps | TextAreaInputProps;