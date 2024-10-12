import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'hollow' | 'hollow-blue' | 'hollow-red' | 'blue-opacity' | 'red-opacity' | 'green' | 'red';
  borderRadius?: 5 | 10;
  size?: 'default' | 'small' | 'verySmall' | 'medium' | 'large';
  link?: string;
}

export type { IButtonProps };
