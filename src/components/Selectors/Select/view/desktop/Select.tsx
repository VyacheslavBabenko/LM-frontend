/* eslint-disable func-names */
import React, { useMemo,useState } from 'react';
import { shallowEqual } from 'react-redux';
import block from 'bem-cn';

import SVG from 'components/SVG';

import { useAppSelector } from 'shared/hooks';
import arrowSVG from 'shared/img/icons/arrow.svg';

import { ISelectProps } from './types';

import './Select.scss';

const b = block('select-desktop');

const Select = function <TValue = string>(
  { items, onChange, color = 'default', capitalized = true }: ISelectProps<TValue>
) {
  const [isOpen, changeOpen] = useState(false);
  const locale = useAppSelector(state => state.locale.common, shallowEqual);
  const itemsList = useMemo(
    () =>
      items
        // .filter(item => !item.active)
        .map(item => (
          <li
            key={item.key}
            className={b('item', { active: item.active })}
            onClick={() => {
              const changedList = items.map(item2 => ({
                ...item2,
                active: item2.key === item.key,
              }));
              const checkHasActive = changedList.filter(item2 => item2.active);
              if (checkHasActive.length === 0) changedList[0].active = true;
              onChange(changedList);
              changeOpen(false);
            }}>
            {locale[item.renderElement as keyof typeof locale] || item.renderElement}
          </li>
        )),
    [items, onChange, changeOpen],
  );

  const activeItem = useMemo(() => items.find(item => item.active) || items[0], [items]);

  return (
    <div className={b({ open: isOpen, color, capitalized })} onClick={() => changeOpen(!isOpen)}>
      <div className={b('item-selected')}>
        <div className={b('item-value-selected')}>
          {locale[activeItem.selectedRenderElement as keyof typeof locale] || activeItem.selectedRenderElement}
        </div>
        <SVG className={b('item-arrow-selected')} svgProps={{ svg: arrowSVG }} />
      </div>
      {isOpen && (
        <ul className={b('items')} onMouseLeave={() => changeOpen(false)}>
          {itemsList}
        </ul>
      )}
    </div>
  );
};

export default Select;
