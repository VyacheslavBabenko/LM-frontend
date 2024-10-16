import { InputHTMLAttributes } from 'react';
import { MouseEventHandler } from 'react';

interface ICheckBoxProps {
  checked: boolean;
  onChange: MouseEventHandler<HTMLDivElement>;
}
export type { ICheckBoxProps };
