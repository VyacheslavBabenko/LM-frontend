import block from 'bem-cn';

import PaginatorSwitcherCustom from 'components/Paginator/PaginatorSwitcherCustom/view/desktop';
import Table from 'components/Table/desktop';

import TransferredLeadsFilters from './ReceivedLeadsFilters/ReceivedLeadsFilters';

import './ReceivedLeads.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';

import { Lead } from 'store/leads/transferredLeads/types';
import useReceivedLeadsModel from 'features/receivedLeads/model/useReceivedLeadsModel';
import { mapUser, useReceivedLeadsTableConfig } from 'features/receivedLeads/model/data';
import ChangeStatusModal from './ChangeStatusModal/ChangeStatusModal';
import Button from 'components/Button/desktop';
import excelSVG from 'shared/img/excel.svg';
import SVG from 'components/SVG';
import Spinner from 'components/Spinner/desktop';
import SummBlock from 'components/SummBlock/desktop/SummBlock';

const b = block('received-leads');
export const ReceivedLeads = () => {
  const { leads, count, totalBudget } = useAppSelector(state => state.receivedLeads);
  const locale = useAppSelector(state => state.locale.common);
  const model = useReceivedLeadsModel();
  const config = useReceivedLeadsTableConfig();

  return (
    <div className={b('wrapper')}>
      <div className={b('top-buttons')}>
        <div className={b('button')}>
          <Button color="hollow-blue" onClick={model.inputState.handleDownloadClick}>
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
                data={leads}
                mapFn={mapUser}
                config={config}
                // sort={model.inputState.values.sortTableRow}
                // onChangeSort={model.inputState.onChangeSortTableRow}
              />
              <SummBlock title={locale.totalBudget} amount={totalBudget} />
            </>
          )
        )}
      </div>
      {count !== 0 && (
        <div className={b('paginator')}>
          <PaginatorSwitcherCustom
            pageCount={model.outputState.pageCount}
            currentPage={model.inputState.values.page}
            onPageClick={model.inputState.onPageChanged}
            itemsCount={model.outputState.count}
          />
        </div>
      )}

      <ChangeStatusModal />
    </div>
  );
};

export default ReceivedLeads;
