import React, { useCallback } from 'react';
import block from 'bem-cn';

import { handleSortByKey } from '../data';
import TableInnerHeaderCell from '../TableInnerHeaderCell/TableInnerHeaderCell';
import { TTableHeader } from '../types';

import './TableInnerHeader.scss';

const b = block('table-header-inner');

function TableInnerHeader<T>(props: TTableHeader<T>) {
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

  return (
    <thead className={b()}>
      <tr className={b('row')}>
        {config.map(item => (
          <TableInnerHeaderCell key={item.key} sort={sort} config={item} onChangeSort={sortHandler} />
        ))}
      </tr>
    </thead>
  );
}

export default TableInnerHeader;
