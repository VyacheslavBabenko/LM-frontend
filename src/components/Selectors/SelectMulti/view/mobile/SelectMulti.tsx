/* eslint-disable func-names */
import React, { useMemo,useState } from 'react';
import block from 'bem-cn';

import CheckBox from 'components/CheckBox/mobile';
import SVG from 'components/SVG';

import arrowSVG from '../img/arrow.svg';
import { ISelectMultiProps } from './types';

import './SelectMulti.scss';

const b = block('select-multi-mobile');

const SelectMulti = function <TValue = string>({
  items,
  onChange,
  placeholder = '',
  selectedRenderElement,
  color = 'default',
}: ISelectMultiProps<TValue>) {
  const [isOpen, changeOpen] = useState(false);

  const itemsList = useMemo(
    () =>
      items.map(item => (
        <li
          key={item.key}
          className={b('item')}
          onClick={() => {
            item.active = !item.active;
            onChange([...items]);
          }}>
          <div className={b('item-value')}>{item.renderElement}</div>
          <div className={b('item-check')}>
            <CheckBox checked={item.active} onClick={e => e.stopPropagation()} />
          </div>
        </li>
      )),
    [items, onChange],
  );

  const activeItemsText = useMemo(() => {
    let result = items
      .filter(ai => ai.active)
      .map(ai => ai.renderElement)
      .join(', ');
    if ((items.every(item => item.active) || items.every(item => !item.active)) && placeholder) result = placeholder;
    return result;
  }, [items, placeholder]);

  return (
    <div className={b({ open: isOpen, color })} onMouseLeave={() => changeOpen(false)}>
      <div className={b('item-selected')} onClick={() => changeOpen(!isOpen)}>
        {selectedRenderElement || <span className={b('item-value-selected')}>{activeItemsText}</span>}
        <SVG className={b('item-arrow-selected')} svgProps={{ svg: arrowSVG }} />
      </div>
      {isOpen && <ul className={b('items')}>{itemsList}</ul>}
    </div>
  );
};

export default SelectMulti;
