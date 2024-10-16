import { ETableSortDirections, ITableColConfig, ITableRowItem, ITableSort, TOnChangeSort } from '../types';
import { ReactElement } from 'react';

export type TTable<T, I = null> = {
  data: T[];
  mapFn: (item: T) => ITableRowItem<T>;
  sort?: ITableSort[];
  onChangeSort?: TOnChangeSort;
  config: ITableColConfig<T>[];
  withTotal?: boolean;
  dataInner?: I[];
  mapFnInner?: (item: I) => ITableRowItem<I>;
  configInner?: ITableColConfig<I>[];
  callback?: (item: ITableRowItem<T>) => void;
};

export type TTableHeader<T> = {
  config: ITableColConfig<T>[];
  sort?: ITableSort[];
  onChangeSort?: TOnChangeSort;
  data: ITableRowItem<T>[];
};

export type TTableBody<T, I> = {
  config: ITableColConfig<T>[];
  data: ITableRowItem<T>[];
  withTotal?: boolean;
  dataInner?: I[];
  mapFnInner?: (item: I) => ITableRowItem<I>;
  configInner?: ITableColConfig<I>[];
  callback?: (item: ITableRowItem<T>) => void;
};

export type TTableBodyCell<T> = {
  data: T;
  config: ITableColConfig<T>;
  callback?: (item: ITableRowItem<T>) => void;
  element?: ReactElement;
};

export type TTableHeaderCell<T> = {
  config: ITableColConfig<T>;
  sort?: ITableSort[];
  onChangeSort?: (key: string) => void;
  cellWidth: number;
};

export type TSortIcon = {
  direction: ETableSortDirections;
};
