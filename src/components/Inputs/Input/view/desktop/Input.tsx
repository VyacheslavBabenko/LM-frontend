/* eslint-disable no-unused-expressions */
import React, { useCallback, useMemo, useState } from 'react';
import block from 'bem-cn';

import SVG from 'components/SVG';

import passwordSVG from './img/password.svg';
import passwordOffSVG from './img/passwordOff.svg';
import { IInputProps } from './types';

import './Input.scss';

const b = block('input-desktop');

const Input = ({
  color = 'default',
  fontSize = 16,
  type = 'text',
  measure = '',
  isPassword = false,
  disabled = false,
  error,
  ...restProps
}: IInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordClick = useCallback(
    () => setPasswordVisible(!passwordVisible && isPassword),
    [passwordVisible, isPassword],
  );

  const validState = useMemo(() => {
    if (String(restProps?.value).length === 0 || restProps.isValid === undefined) return 1;
    if (restProps.isValid) return 2;
    return 3;
  }, [restProps.isValid, restProps.value]);

  return (
    <>
      <div className={b({ color, fontSize, validState, disabled, error: !!error })}>
        <input
          className={b('native', {
            type: isPassword ? 'password' : type,
            activePassword: isPassword && !passwordVisible,
            error: !!error,
          })}
          type={passwordVisible ? 'text' : type}
          disabled={disabled}
          {...restProps}
        />

        {isPassword && (
          <>
            <SVG
              svgProps={{ src: passwordSVG }}
              className={b('password', { active: passwordVisible })}
              onClick={passwordClick}
            />
            <SVG
              svgProps={{ src: passwordOffSVG }}
              className={b('password-off', { active: !passwordVisible })}
              onClick={passwordClick}
            />
          </>
        )}
        {measure && <span className={b('measure')}>{measure}</span>}
      </div>
      {error && <div className={b('error')}>{error}</div>}
    </>
  );
};

export default Input;
