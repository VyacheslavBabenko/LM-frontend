import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'hollow';
  borderRadius?: 5;
  link?: string;
}

export type { IButtonProps };
