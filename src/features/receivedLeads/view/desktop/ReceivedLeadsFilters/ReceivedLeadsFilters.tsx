import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';
import block from 'bem-cn';

import FilterHeader from 'components/FilterHeader/desktop';
import Input from 'components/Inputs/Input/desktop';

import './ReceivedLeadsFilters.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import SelectFinder from 'components/Selectors/SelectFinder/desktop';

const b = block('received-leads-filters');

interface IReceivedLeadsFilters {
  filterState: any;
}

const ReceivedLeadsFilters: FC<IReceivedLeadsFilters> = ({ filterState }) => {
  const locale = useAppSelector(state => state.locale.common, shallowEqual);

  return (
    <section className={b()}>
      <FilterHeader
        itemsOnPage={filterState.values.itemsOnPage}
        onItemsOnPageChange={filterState.onItemsOnPageChanged}
        onSubmit={filterState.onSubmit}>
        <div className={b('inputs')}>
          <div className={b('item')}>
            <div className={b('item-name')}>{locale.firstName}</div>
            <div className={b('item-field')}>
              <Input
                value={filterState.values.firstName || ''}
                placeholder={locale.firstName}
                type="string"
                name="firstName"
                onChange={filterState.handleChange}
              />
            </div>
          </div>
          <div className={b('item')}>
            <div className={b('item-name')}>{locale.lastName}</div>
            <div className={b('item-field')}>
              <Input
                value={filterState.values.lastName}
                placeholder={locale.lastName}
                type="string"
                name="lastName"
                onChange={filterState.handleChange}
              />
            </div>
          </div>
          <div className={b('item')}>
            <div className={b('item-name')}>{locale.company}</div>
            <div className={b('item-field')}>
              <SelectFinder items={filterState.values.company} onChange={filterState.onChangeCompany} />
            </div>
          </div>
          <div className={b('item')}>
            <div className={b('item-name')}>{locale.installment}</div>
            <div className={b('item-field')}>
              <SelectFinder items={filterState.values.installment} onChange={filterState.onChangeInstallment} />
            </div>
          </div>
        </div>
        <div className={b('second-inputs')}>
          <div className={b('item')}>
            <div className={b('item-name')}>{locale.status}</div>
            <div className={b('item-field')}>
              <SelectFinder items={filterState.values.statuses} onChange={filterState.onChangeStatus} />
            </div>
          </div>

          <div className={b('item')}>
            <div className={b('item-name')}>{locale.purchaseCountry}</div>
            <div className={b('item-field')}>
              <SelectFinder items={filterState.values.purchaseCountry} onChange={filterState.onChangePurchaseCountry} />
            </div>
          </div>
          <div className={b('item')}>
            <div className={b('item-name')}>{locale.leadGeolocation}</div>
            <div className={b('item-field')}>
              <SelectFinder items={filterState.values.leadGeolocation} onChange={filterState.onChangeLeadGeolocation} />
            </div>
          </div>
        </div>
      </FilterHeader>
    </section>
  );
};

export default ReceivedLeadsFilters;
