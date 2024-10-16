import React from 'react';
import block from 'bem-cn';

import { ICheckBoxProps } from './types';

import './Toggle.scss';

const b = block('toggle-desktop');

const Toggle = ({ checked, onChange }: ICheckBoxProps) => (
  <div className={b({ checked })} onClick={onChange}>
    <div className={b('indicator')} />
  </div>
);

export default Toggle;
