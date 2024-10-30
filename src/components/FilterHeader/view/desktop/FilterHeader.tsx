import React, { useEffect, useRef, useState } from 'react';
import block from 'bem-cn';

import Button from 'components/Button/desktop';
import Select from 'components/Selectors/Select/desktop';
import SVG from 'components/SVG';

import arrowSVG from 'shared/img/arrow.svg';
import renewSVG from 'shared/img/renew.svg';

import filterSVG from './img/filter.svg';
import { IFilterHeaderProps } from './types';

import './FilterHeader.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';

const b = block('filter-header-desktop');

const FilterHeader = ({ itemsOnPage, onItemsOnPageChange, onSubmit, children }: IFilterHeaderProps) => {
  const locale = useAppSelector(state => state.locale.common);

  const [isOpen, setIsOpen] = useState(true);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();

    if (e.key === 'Enter' && onSubmit) {
      onSubmit(new Event('submit') as never as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleButtonClick = () => {
    if (onSubmit) {
      onSubmit(new Event('submit') as never as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <form className={b({ isOpen })} onSubmit={handleSubmit} tabIndex={0} onKeyUp={handleKeyUp}>
      <div className={b('top')}>
        <div className={b('block', { clickable: true })} onClick={() => setIsOpen(!isOpen)}>
          <SVG className={b('icon', { position: 'right' })} svgProps={{ src: filterSVG }} />
          {locale.filter}
          {!!children && (
            <SVG className={b('icon', { close: !isOpen, position: 'left' })} svgProps={{ src: arrowSVG }} />
          )}
        </div>
        <div className={b('block')}>
          {itemsOnPage && onItemsOnPageChange && (
            <>
              {locale.showEntries}:
              <div className={b('selector')}>
                <Select items={itemsOnPage} onChange={onItemsOnPageChange} />
              </div>
            </>
          )}
          <div className={b('button')}>
            <Button size="small" onClick={handleButtonClick} color="hollow-blue">
              <SVG className={b('icon', { position: 'right' })} svgProps={{ src: renewSVG }} />
              {locale.applyFilter}
            </Button>
          </div>
        </div>
      </div>
      {!!children && isOpen && <div className={b('bottom')}>{children}</div>}
    </form>
  );
};

export default FilterHeader;
