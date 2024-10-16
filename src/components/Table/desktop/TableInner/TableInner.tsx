import React, { useMemo } from 'react';
import block from 'bem-cn';

import { mapToTableData } from './data';
import TableInnerBody from './TableInnerBody/TableInnerBody';
import TableInnerHeader from './TableInnerHeader/TableInnerHeader';
import { TTable } from './types';

import './TableInner.scss';

const b = block('table-inner');

function TableInner<T>(props: TTable<T>) {
  const { config, data, mapFn, sort, onChangeSort, withTotal } = props;

  const tableData = useMemo(() => mapToTableData(data, mapFn), [data, mapFn]);

  return (
    <table cellSpacing={0} className={b()}>
      <TableInnerHeader config={config} sort={sort} data={tableData} onChangeSort={onChangeSort} />
      <TableInnerBody config={config} data={tableData} withTotal={withTotal} />
    </table>
  );
}

export default TableInner;
