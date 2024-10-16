import React from 'react';

import { ISelectorListItem } from 'shared/types';

type IFilterHeaderProps = {
  itemsOnPage?: ISelectorListItem<number>[];
  onItemsOnPageChange?: (value: ISelectorListItem<number>[]) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  children?: unknown;
};

export type { IFilterHeaderProps };
