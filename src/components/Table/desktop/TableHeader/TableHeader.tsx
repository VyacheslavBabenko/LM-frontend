import React, { useCallback } from 'react';
import block from 'bem-cn';

import { handleSortByKey } from '../../data';
import TableHeaderCell from '../TableHeaderCell/TableHeaderCell';
import { TTableHeader } from '../types';

import './TableHeader.scss';

const b = block('table-header');

function TableHeader<T>(props: TTableHeader<T>) {
  const { config, sort, onChangeSort, data } = props;

  const sortHandler = useCallback(
    (key: string) => {
      if (sort && onChangeSort) {
        const newSort = handleSortByKey(sort, key);
        onChangeSort(newSort);
      }
    },
    [onChangeSort, sort],
  );

  const cellWidth = 100 / config.length;

  return (
    <thead className={b()}>
      <tr className={b('row')}>
        {config.map(item => (
          <TableHeaderCell key={item.key} sort={sort} config={item} onChangeSort={sortHandler} cellWidth={cellWidth} />
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
