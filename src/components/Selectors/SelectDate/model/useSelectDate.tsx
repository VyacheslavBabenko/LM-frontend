import React from 'react';
import dayjs from 'dayjs';

import { useDateItems } from './data';
import { TUseSelectDate } from './types';

const useSelectDate = ({ onChange, date, format = 'YYYY-MM-DD' }: TUseSelectDate) => {
  const { monthsItems, yearsItems } = useDateItems();

  const months = monthsItems.map(i => ({
    ...i,
    active: i.value === dayjs(date).month(),
  }));

  const years = yearsItems.map(i => ({
    ...i,
    active: i.value === dayjs(date).year(),
  }));

  const handleMonthChange = (items: typeof months) => {
    const activeMonth = items.find(i => i.active) ?? items[0];
    const newDate = dayjs(date).set('month', activeMonth.value).format(format);
    onChange(newDate);
  }

  const handleYearChange = (items: typeof years) => {
    const activeYear = items.find(i => i.active) ?? items[0];
    const newDate = dayjs(date).set('year', activeYear.value).format(format);
    onChange(newDate);
  }

  return ({
    months,
    years,
    handleMonthChange,
    handleYearChange,
  });
}

export default useSelectDate;