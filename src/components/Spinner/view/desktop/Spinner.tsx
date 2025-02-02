import React from 'react';
import block from 'bem-cn';

import spinnerIMG from './img/spinner.png';

import { ISpinnerProps } from './types';
import './Spinner.scss';

const b = block('spinner-desktop');

const Spinner = ({ isLoading, foolViewport, isLoadingNotFullViewport }: ISpinnerProps) =>
  isLoading ? (
    <div className={b({ foolViewport, isLoadingNotFullViewport })}>
      <img alt="spinner" className={b('logo')} src={spinnerIMG} />
    </div>
  ) : null;

export default Spinner;
