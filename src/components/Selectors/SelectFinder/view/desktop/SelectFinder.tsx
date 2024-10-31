import React, { useCallback, useEffect, useMemo, useState } from 'react';
import block from 'bem-cn';

import SVG from 'components/SVG';

import arrowSVG from 'shared/img/arrow.svg';

import { ISelectProps } from './types';

import './SelectFinder.scss';

const b = block('select-finder-desktop');

const SelectFinder = function <TValue = string>({
  items,
  onChange,
  color = 'default',
  disabled,
}: ISelectProps<TValue>) {
  const [isOpen, changeOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

  const itemsList = useMemo(
    () =>
      items
        .filter(item => item.renderElement.toLocaleLowerCase().includes(search?.toLowerCase() ?? ''))
        .map((item, i) => (
          <li
            key={`${item.key}_${i}`}
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
              setSearch(null);
            }}>
            {item.renderElement}
          </li>
        )),
    [items, onChange, changeOpen, search],
  );

  const activeItem = useMemo(() => items.find(item => item.active) || items[0], [items]);

  useEffect(() => {
    if (search !== null) setSearch(activeItem.renderElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSearch(null);
    changeOpen(false);
  }, []);

  const handleSelectorClick = () => {
    if (!disabled) changeOpen(!isOpen);
  };

  return (
    <div className={b({ open: isOpen, color, disabled })} onClick={handleSelectorClick} onMouseLeave={handleMouseLeave}>
      <div className={b('item-selected')}>
        <input
          className={b('item-value-selected')}
          value={search ?? activeItem.renderElement}
          onChange={handleInputChange}
        />
        <SVG className={b('item-arrow-selected')} svgProps={{ src: arrowSVG }} />
      </div>
      {(isOpen || search !== null) && (
        <ul className={b('items')} onMouseLeave={handleMouseLeave}>
          {itemsList}
        </ul>
      )}
    </div>
  );
};

export default SelectFinder;
