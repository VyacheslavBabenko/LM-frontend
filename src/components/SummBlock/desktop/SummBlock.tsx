import React from 'react';
import block from 'bem-cn';

import './SummBlock.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';

interface ISummBlock {
  title: string;
  amount: number;
}

const b = block('summ-block');
export const SummBlock: React.FC<ISummBlock> = ({ title, amount }) => {
  const locale = useAppSelector(state => state.locale.common);

  return (
    <div className={b()}>
      <div className={b('title')}>{locale[title as keyof typeof locale] || title}</div>
      <div className={b('amount')}>{amount ? amount.toFixed(2) : 0}</div>
    </div>
  );
};

export default SummBlock;
