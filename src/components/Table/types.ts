import { ReactElement } from 'react';

export enum ETableSortDirections {
  ASC = '+',
  DESC = '-',
  DEFAULT = 'default',
}

export type TOnChangeSort = (value: ITableSort[]) => void;

export interface ITableSort {
  key: string;
  direction: ETableSortDirections;
  convertedKey: string;
}

export interface ITableRowItem<T> {
  id: string;
  data: T & { withoutCallback?: boolean };
}

export interface ITableColConfig<T> {
  key: string;
  localizationKey?: string;
  withBodyLocalization?: boolean;
  withSort?: boolean;
  renderHead?: () => ReactElement;
  renderBody?: (data: T, element?: ReactElement) => ReactElement | null;
  style?: { [key: string]: string };
}
