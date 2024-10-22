import { PhoneInputProps } from 'react-phone-input-2';

interface IInputPhone2Props extends PhoneInputProps {
  color?: 'default';
  fontSize?: 16;
  measure?: string;
  isPassword?: boolean;
  error?: string | null;
  isValid?: boolean;
  setIsValid?: (value: boolean) => void;
}

export type { IInputPhone2Props };
