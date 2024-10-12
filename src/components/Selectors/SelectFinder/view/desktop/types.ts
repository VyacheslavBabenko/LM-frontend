import { ISelectorListItemSimple } from 'shared/types';

interface ISelectProps<TValue> {
  items: ISelectorListItemSimple<TValue>[];
  onChange: (value: ISelectorListItemSimple<TValue>[]) => void;
  color?: 'default';
  disabled?: boolean;
}

export type { ISelectProps };
