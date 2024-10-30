import block from 'bem-cn';

import PaginatorSwitcherCustom from 'components/Paginator/PaginatorSwitcherCustom/view/desktop';
import Table from 'components/Table/desktop';

import TransferredLeadsFilters from './TransferredLeadsFilters/TransferredLeadsFilters';

import './TransferredLeads.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { mapUser, useTransferredLeadsTableConfig } from 'features/transferredLeads/model/data';
import useTransferredLeadsModel from 'features/transferredLeads/model/useTransferredLeadsModel';
import { Lead } from 'store/leads/transferredLeads/types';
import SummBlock from 'components/SummBlock/desktop/SummBlock';
import Button from 'components/Button/desktop';
import SVG from 'components/SVG';
import excelSVG from 'shared/img/excel.svg';
import Spinner from 'components/Spinner/desktop';

const b = block('transferred-leads');
export const TransferredLeads = () => {
  const { leads, count, totalBudget } = useAppSelector(state => state.transferredLeads);
  const locale = useAppSelector(state => state.locale.common);

  const model = useTransferredLeadsModel();
  const config = useTransferredLeadsTableConfig();

  // const onRoleIconClick = (id: string) => {
  // 	model.inputState.onChangeUserID(id);
  // };

  const items = leads.map(item => ({ ...item }));

  return (
    <div className={b('wrapper')}>
      <div className={b('top-buttons')}>
        <div className={b('button')}>
          <Button color="hollow-blue">
            <SVG className={b('button', 'icon')} svgProps={{ src: excelSVG }} />
            {locale.exportExcel}
          </Button>
        </div>
      </div>

      <div className={b()}>
        <TransferredLeadsFilters filterState={model.inputState} />
        {model.loading ? (
          <Spinner isLoading={model.loading} isLoadingNotFullViewport={true} />
        ) : (
          leads.length !== 0 && (
            <>
              <Table<Lead>
                data={items}
                mapFn={mapUser}
                config={config}
                // sort={model.inputState.values.sortTableRow}
                // onChangeSort={model.inputState.onChangeSortTableRow}
              />
              <SummBlock title="totalBalance" amount={totalBudget} />
            </>
          )
        )}
      </div>
      {count !== 0 && !model.loading && (
        <div className={b('paginator')}>
          <PaginatorSwitcherCustom
            pageCount={model.outputState.pageCount}
            currentPage={model.inputState.values.page}
            onPageClick={model.inputState.onPageChanged}
            itemsCount={model.outputState.count}
          />
        </div>
      )}
    </div>
  );
};

export default TransferredLeads;
