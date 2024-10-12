import React from 'react';

import { ISelectorListItem } from 'shared/types';

interface ISelectMultiProps<TValue> {
  items: ISelectorListItem<TValue>[];
  onChange: (items: ISelectorListItem<TValue>[]) => void;
  selectedRenderElement?: React.ReactNode | string | null;
  placeholder?: string;
  color?: 'default';
}

export type { ISelectMultiProps };
