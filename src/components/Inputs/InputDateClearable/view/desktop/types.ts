import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

interface IInputDateClearableProps extends ReactDatePickerProps {
  isValid?: boolean;
  color?: string;
}

interface IInnerComponentProps {
  children?: React.ReactNode;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export type { IInputDateClearableProps, IInnerComponentProps };
