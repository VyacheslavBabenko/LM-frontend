import { ETableSortDirections, ITableColConfig, ITableRowItem, ITableSort, TOnChangeSort } from '../../types';

export type TTable<T> = {
  data: T[];
  mapFn: (item: T) => ITableRowItem<T>;
  sort?: ITableSort[];
  onChangeSort?: TOnChangeSort;
  config: ITableColConfig<T>[];
  withTotal?: boolean;
};

export type TTableHeader<T> = {
  config: ITableColConfig<T>[];
  sort?: ITableSort[];
  onChangeSort?: TOnChangeSort;
  data: ITableRowItem<T>[];
};

export type TTableBody<T> = {
  config: ITableColConfig<T>[];
  data: ITableRowItem<T>[];
  withTotal?: boolean;
};

export type TTableBodyCell<T> = {
  data: T;
  config: ITableColConfig<T>;
};

export type TTableHeaderCell<T> = {
  config: ITableColConfig<T>;
  sort?: ITableSort[];
  onChangeSort?: (key: string) => void;
};

export type TSortIcon = {
  direction: ETableSortDirections;
};
