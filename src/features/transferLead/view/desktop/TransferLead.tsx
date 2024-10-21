import block from 'bem-cn';

import Button from 'components/Button/desktop';
import Input from 'components/Inputs/Input/desktop';
import TitleWithIcon from 'components/TitleWithIcon/TitleWithIcon';

import userSVG from 'shared/img/player.svg';

import accountDataSVG from 'shared/img/leads/account-data.svg';
import hierarchySVG from 'shared/img/leads/hierarchy.svg';

import './TransferLead.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import useTransferLeadModel from 'features/transferLead/model/useTransferLeadModel';
import { useNavigate } from 'react-router-dom';
import CheckBox from 'components/CheckBox/desktop';
import SelectFinder from 'components/Selectors/SelectFinder/desktop';
import Spinner from 'components/Spinner/desktop';

const b = block('transfer-lead');
const TransferLead = () => {
  const locale = useAppSelector(state => state.locale.common);
  const loading = useAppSelector(state => state.transferLead.loading);
  const navigate = useNavigate();
  const model = useTransferLeadModel();

  const onClickCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <form onSubmit={model.onSubmit} className={b()}>
        <Spinner isLoading={loading} />
        <div className={b('block', { id: 2 })}>
          <TitleWithIcon title={locale.personalInfo} icon={userSVG} />
          <div className={b('items', { personalInfo: true })}>
            <div className={b('item')}>
              <div className={b('item-name')}>{locale.firstName}</div>
              <div className={b('item-field')}>
                <Input
                  value={model.values.firstName}
                  placeholder={locale.firstName}
                  type="string"
                  name="firstName"
                  onChange={e => model.handleChange(e)}
                />
              </div>
            </div>
            <div className={b('item')}>
              <div className={b('item-name')}>{locale.lastName}</div>
              <div className={b('item-field')}>
                <Input
                  value={model.values.lastName}
                  placeholder={locale.lastName}
                  type="string"
                  name="lastName"
                  onChange={e => model.handleChange(e)}
                />
              </div>
            </div>
            <div className={b('item')}>
              <div className={b('item-name')}>{locale.phone}</div>
              <div className={b('item-field')}>
                <Input
                  value={model.values.phone}
                  placeholder={locale.phone}
                  type="number"
                  name="phone"
                  onChange={e => model.handleChange(e)}
                />
              </div>
            </div>
            <div className={b('item')}>
              <div className={b('item-name')}>{locale.country}</div>
              <div className={b('item-field')}>
                <SelectFinder items={model.values.country} onChange={model.onChangeCountry} />
              </div>
            </div>
          </div>
        </div>
        <div className={b('block')}>
          <TitleWithIcon title={locale.accountData} icon={accountDataSVG} />
          <div className={b('items', { accountData: true })}>
            <div className={b('item')}>
              <div className={b('item-name')}>{locale.purchaseTimeframe}</div>
              <div className={b('item-field')}>
                <Input
                  value={model.values.purchaseTimeframe}
                  placeholder={locale.purchaseTimeframe}
                  type="string"
                  name="purchaseTimeframe"
                  onChange={e => model.handleChange(e)}
                />
              </div>
            </div>
            <div className={b('item')}>
              <div className={b('item-name')}>{locale.budget}</div>
              <div className={b('item-field')}>
                <Input
                  value={model.values.budget}
                  placeholder={locale.budget}
                  type="string"
                  name="budget"
                  onChange={e => model.handleChange(e)}
                />
              </div>
            </div>

            <div className={b('item')}>
              <div className={b('item-name')}>{locale.details}</div>
              <div className={b('item-field')}>
                <Input
                  value={model.values.details}
                  placeholder={locale.details}
                  type="string"
                  name="details"
                  onChange={e => model.handleChange(e)}
                />
              </div>
            </div>

            <div className={b('item-checkbox')}>
              <div className={b('item-checkbox-name')}>{locale.installment}</div>
              <div className={b('item-checkbox-field')}>
                <CheckBox
                  checked={model.values.installment}
                  onChange={e => model.handleCheckboxChange(e)}
                  name="installment"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={b('block', { id: 3 })}>
          <TitleWithIcon title={locale.settings} icon={hierarchySVG} />

          <div className={b('items', { accountSettings: true })}>
            <div className={b('item')}>
              <div className={b('item-name')}>{locale.recipient}</div>
              <div className={b('item-field')}>
                <SelectFinder items={model.values.recipient} onChange={model.onChangeRecipient} />
              </div>
            </div>

            <div className={b('item')}>
              <div className={b('item-name')}>{locale.comments}</div>
              <div className={b('item-field')}>
                <Input
                  value={model.values.comments}
                  placeholder={locale.comments}
                  type="string"
                  name="comments"
                  onChange={e => model.handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={b('bottom')}>
          <Button onClick={() => onClickCancel()} color="hollow-blue">
            {locale.cancel}
          </Button>
          <Button disabled={model.disabled} type="submit" color="green">
            {locale.save}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TransferLead;
