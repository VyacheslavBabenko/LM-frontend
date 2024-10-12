import { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: 'default';
  fontSize?: 16;
  isValid?: boolean;
  measure?: string;
  isPassword?: boolean;
}

export type { IInputProps };
