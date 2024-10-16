import React, { useMemo } from 'react';
import block from 'bem-cn';

import { mapToTableData } from '../data';
import TableBody from './TableBody/TableBody';
import TableHeader from './TableHeader/TableHeader';
import { TTable } from './types';

import './Table.scss';

const b = block('table');

function Table<T, I = null>(props: TTable<T, I>) {
  const { config, data, mapFn, sort, onChangeSort, withTotal, configInner, dataInner, mapFnInner, callback } = props;

  const tableData = useMemo(() => mapToTableData(data, mapFn), [data, mapFn]);

  return (
    <table cellSpacing={0} className={b()}>
      <TableHeader config={config} sort={sort} data={tableData} onChangeSort={onChangeSort} />
      <TableBody
        config={config}
        data={tableData}
        withTotal={withTotal}
        dataInner={dataInner}
        mapFnInner={mapFnInner}
        configInner={configInner}
        callback={callback}
      />
    </table>
  );
}

export default Table;
