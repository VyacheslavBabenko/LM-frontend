import { ISelectorListItem } from 'shared/types';

export const defaultItemsOnPage: ISelectorListItem<number>[] = [
  { value: 10, key: '10', renderElement: '10', selectedRenderElement: '10', active: true },
  { value: 20, key: '20', renderElement: '20', selectedRenderElement: '20', active: false },
  { value: 50, key: '50', renderElement: '50', selectedRenderElement: '50', active: false },
  { value: 100, key: '100', renderElement: '100', selectedRenderElement: '100', active: false },
];