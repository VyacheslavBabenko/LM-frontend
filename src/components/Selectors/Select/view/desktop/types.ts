import { ISelectorListItem } from 'shared/types';

interface ISelectProps<TValue> {
  items: ISelectorListItem<TValue>[];
  onChange: (value: ISelectorListItem<TValue>[]) => void;
  color?: 'default';
  capitalized?: boolean;
}

export type { ISelectProps };
