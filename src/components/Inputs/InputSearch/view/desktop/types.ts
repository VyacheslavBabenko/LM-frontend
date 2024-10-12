import { InputHTMLAttributes } from 'react';

interface IInputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: 'default';
  fontSize?: 16;
  isValid?: boolean;
}

export type { IInputSearchProps };
