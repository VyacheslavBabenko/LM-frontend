import descSortSvg from '../../../img/asc-sort.svg';
import defaultSortSVG from '../../../img/default-sort.svg';
import ascSortSvg from '../../../img/desc-sort.svg';
import { ETableSortDirections, ITableRowItem, ITableSort } from '../../../types';

export function mapToTableData<T>(data: T[], fn: (data: T) => ITableRowItem<T>) {
  return data.map(fn);
}

export function handleSortByKey(sort: ITableSort[], key: string) {
  return sort.map(el => {
    if (el.key === key) {
      if (el.direction === ETableSortDirections.DEFAULT) {
        return {
          ...el,
          direction: ETableSortDirections.DESC,
        };
      }
      if (el.direction === ETableSortDirections.DESC) {
        return {
          ...el,
          direction: ETableSortDirections.ASC,
        };
      }
    }

    return {
      ...el,
      direction: ETableSortDirections.DEFAULT,
    };
  }) as ITableSort[];
}

export const sortIcons = {
  [ETableSortDirections.DEFAULT]: defaultSortSVG,
  [ETableSortDirections.ASC]: ascSortSvg,
  [ETableSortDirections.DESC]: descSortSvg,
};
