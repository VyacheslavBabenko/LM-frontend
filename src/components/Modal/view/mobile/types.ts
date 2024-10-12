import React, { HTMLAttributes } from 'react';

interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
}

export type { IModalProps };
