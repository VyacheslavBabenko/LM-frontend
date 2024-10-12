import React from 'react';
import block from 'bem-cn';
import PhoneInput from 'react-phone-input-2';

import { usePhoneValidator } from 'components/Inputs/InputPhone2/model';

import 'react-phone-input-2/lib/style.css';

import { IInputPhone2Props } from './types';
import './InputPhone.scss';

const b = block('input-phone2-desktop');

const InputPhone = ({ isValid, setIsValid, ...restProps }: IInputPhone2Props) => {
  const validate = usePhoneValidator({ setIsValid });
  return (
    <div className={b({ isValid })}>
      <PhoneInput {...restProps} isValid={validate} />
    </div>
  );
};

export default InputPhone;
