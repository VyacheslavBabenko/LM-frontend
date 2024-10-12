import React from 'react';
import block from 'bem-cn';

import Select from 'components/Selectors/Select/desktop';

import { useAppSelector } from 'shared/hooks';

import { TUseSelectDate } from '../model/types';
import useSelectDate from '../model/useSelectDate';

import './SelectDate.scss';

const b = block('select-date-desktop');

const SelectDate = (data: TUseSelectDate) => {
  const locale = useAppSelector(state => state.locale.common);
  const { months, years, handleMonthChange, handleYearChange } = useSelectDate(data);

  return (
    <section className={b()}>
      <div className={b('item')}>
        <div className={b('label')}>{locale.month}</div>
        <div className={b('month')}>
          <Select items={months} onChange={handleMonthChange} />
        </div>
      </div>
      <div className={b('item')}>
        <div className={b('label')}>{locale.year}</div>
        <div className={b('year')}>
          <Select items={years} onChange={handleYearChange} />
        </div>
      </div>
    </section>
  );
}

export default SelectDate;