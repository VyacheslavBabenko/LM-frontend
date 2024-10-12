import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import { ISelectorListItem } from 'shared/types';

dayjs.extend(localeData);

const years = [2022, 2023, 2024, 2025, 2026, 2027];

const useDateItems = () => {
  const months = dayjs.months();

  const monthsItems: ISelectorListItem<number>[] = months.map((month, index) => ({
    key: month,
    value: index,
    renderElement: month,
    selectedRenderElement: month,
    active: false,
  }));

  const yearsItems: ISelectorListItem<number>[] = years.map(year => ({
    key: String(year),
    value: year,
    renderElement: year,
    selectedRenderElement: year,
    active: false,
  }));

  return ({
    monthsItems,
    yearsItems,
  })
}

export { useDateItems };
