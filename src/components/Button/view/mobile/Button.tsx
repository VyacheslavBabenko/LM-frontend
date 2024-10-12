import React, { useCallback } from 'react';
import block from 'bem-cn';
import { Link } from 'react-router-dom';

import { IButtonProps } from './types';
import './Button.scss';

const b = block('button-mobile');

const Button = ({
  children,
  disabled = false,
  color = 'default',
  borderRadius = 5,
  type = 'button',
  link,
  onClick,
}: IButtonProps) => {
  const handleClick = useCallback(
    e => {
      if (disabled) {
        e.preventDefault();
      } else if (onClick) {
        onClick(e);
      }
    },
    [disabled, onClick],
  );

  return link ? (
    <Link className={b({ disabled, color, borderRadius })} to={link} onClick={handleClick}>
      {children}
    </Link>
  ) : (
    <button type={type} className={b({ disabled, color, borderRadius })} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
