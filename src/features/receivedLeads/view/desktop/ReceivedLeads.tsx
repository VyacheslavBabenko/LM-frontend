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

const b = block('received-leads');
export const ReceivedLeads = () => {
  const { leads, count } = useAppSelector(state => state.receivedLeads);
  const model = useReceivedLeadsModel();
  const config = useReceivedLeadsTableConfig();

  return (
    <div className={b('wrapper')}>
      <div className={b()}>
        <TransferredLeadsFilters filterState={model.inputState} />
        {leads.length !== 0 && (
          <>
            <Table<Lead>
              data={leads}
              mapFn={mapUser}
              config={config}
              // sort={model.inputState.values.sortTableRow}
              // onChangeSort={model.inputState.onChangeSortTableRow}
            />
          </>
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
