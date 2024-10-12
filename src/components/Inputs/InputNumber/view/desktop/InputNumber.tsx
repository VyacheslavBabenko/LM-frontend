/* eslint-disable no-unused-expressions */
import React from 'react';

import Input from 'components/Inputs/Input/desktop';

import { IInputNumberProps } from './types';

const InputNumber = ({ onChangeNumber, needFilled, ...restProps }: IInputNumberProps) => (
    <Input
      {...restProps}
      value={restProps.value || (needFilled ? 0 : '')}
      onChange={e => {
        let value: number | undefined = Number(e.target.value);
        if (e.target.value.length === 0) value = 0;
        if (e.target.value.length !== 0 && !Number(e.target.value)) value = Number(restProps.value);
        onChangeNumber(Math.abs(value));
      }}
      type="text"
    />
  );

export default InputNumber;
