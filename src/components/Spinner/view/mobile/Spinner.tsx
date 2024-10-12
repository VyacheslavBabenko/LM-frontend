import React from 'react';
import block from 'bem-cn';

import spinnerIMG from './img/spinner.png';

import { ISpinnerProps } from './types';
import './Spinner.scss';

const b = block('spinner-mobile');

const Spinner = ({ isLoading, foolViewport }: ISpinnerProps) => isLoading ? (
    <div className={b({ foolViewport })}>
      <img alt="spinner" className={b('logo')} src={spinnerIMG} />
    </div>
  ) : null;

export default Spinner;
