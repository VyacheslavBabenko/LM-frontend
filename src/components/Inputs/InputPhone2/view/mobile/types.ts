import { PhoneInputProps } from 'react-phone-input-2';

interface IInputPhone2Props extends PhoneInputProps {
  isValid?: boolean;
  setIsValid?: (value: boolean) => void;
}

export type { IInputPhone2Props };
