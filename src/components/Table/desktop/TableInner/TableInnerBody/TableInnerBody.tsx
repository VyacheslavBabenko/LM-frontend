import React from 'react';
import block from 'bem-cn';

import TableInnerBodyCell from '../TableInnerBodyCell/TableInnerBodyCell';
import { TTableBody } from '../types';

import './TableInnerBody.scss';

const b = block('table-body-dekstop-inner');

function TableInnerBody<T>(props: TTableBody<T>) {
  const { config, data, withTotal } = props;

  return (
    <tbody className={b({ withTotal })}>
      {data.map(item => (
        <tr key={item.id} className={b('row')}>
          {config.map(col => (
            <TableInnerBodyCell key={col.key} data={item.data} config={col} />
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableInnerBody;
