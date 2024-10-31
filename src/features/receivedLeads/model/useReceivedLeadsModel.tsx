import { useCallback, useEffect, useMemo, useState } from 'react';

import { defaultItemsOnPage } from 'components/FilterHeader/data';

import { useInstallmentItems, useLeadStatusItems } from './data';
import { useAppDispatch, useAppSelector } from 'shared/hooks/useAppSelector';
import { countryItems, getNoneSelectItem } from 'features/transferLead/model/data';
import { fetchUsers } from 'store/users/usersSlice';
import { formatCompaniesToFinder } from 'features/auth/model/signUp/data';
import { downloadReceivedLeadsExcel, fetchReceivedLeads } from 'store/leads/receivedLeads/receivedLeads';
import { shallowEqual } from 'react-redux';

const useModel = () => {
  const dispatch = useAppDispatch();
  const leadStatusItems = useLeadStatusItems();
  const installmentItems = useInstallmentItems();

  const count = useAppSelector(state => state.receivedLeads.count);
  const { refetch, loading } = useAppSelector(state => state.receivedLeads, shallowEqual);
  const locale = useAppSelector(state => state.locale.common);
  const { companies } = useAppSelector(state => state.users);
  const { user } = useAppSelector(state => state.auth);

  const notChosenItem = useMemo(() => getNoneSelectItem(locale.notChosen), [locale]);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    company: [notChosenItem],
    installment: [notChosenItem, ...installmentItems],
    leadGeolocation: [notChosenItem, ...countryItems],
    purchaseCountry: [notChosenItem, ...countryItems],
    statuses: [notChosenItem, ...leadStatusItems],

    page: 0,
    itemsOnPage: defaultItemsOnPage,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      company: [notChosenItem, ...formatCompaniesToFinder(companies)],
    });
  }, [companies, locale]);

  useEffect(() => {
    setValues(prevValues => ({
      ...prevValues,
      installment: [notChosenItem, ...installmentItems],
      statuses: [notChosenItem, ...leadStatusItems],
      leadGeolocation: [notChosenItem, ...countryItems],
      purchaseCountry: [notChosenItem, ...countryItems],
    }));
  }, [locale]);

  const onChangeSortTableRow = useCallback(value => setValues(ps => ({ ...ps, sortTableRow: value })), []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.checked,
    }));
  }, []);

  const onChangeLeadGeolocation = useCallback(
    (value: typeof values.leadGeolocation) => setValues(ps => ({ ...ps, leadGeolocation: value })),
    [],
  );

  const onChangePurchaseCountry = useCallback(
    (value: typeof values.leadGeolocation) => setValues(ps => ({ ...ps, purchaseCountry: value })),
    [],
  );

  const onChangeStatus = useCallback(
    (value: typeof values.statuses) => setValues(ps => ({ ...ps, statuses: value })),
    [],
  );

  const onChangeInstallment = useCallback(
    (value: typeof values.installment) => setValues(ps => ({ ...ps, installment: value })),
    [],
  );

  const onPageChanged = useCallback(
    (value: number) =>
      setValues(ps => ({
        ...ps,
        page: value,
      })),
    [],
  );

  const onItemsOnPageChanged = useCallback(
    (value: typeof values.itemsOnPage) => setValues(ps => ({ ...ps, itemsOnPage: value })),
    [],
  );

  const handleDownloadClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      dispatch(
        downloadReceivedLeadsExcel({
          excel: true,
        }),
      );
    },
    [dispatch],
  );

  const pageCount = Math.ceil(count / Number(values.itemsOnPage.filter(item => item.active)[0].value)) ?? 1;

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const finalItemsOnPage = values.itemsOnPage.filter(s => s.active).map(s => s.value)[0];

      const purchaseCountryActive = values.purchaseCountry.find(el => el.active);
      const leadGeolocationActive = values.leadGeolocation.find(el => el.active);
      const statusActive = values.statuses.find(el => el.active);
      const installmentActive = values.installment.find(el => el.active);
      const companiesActive = values.company.find(el => el.active);

      dispatch(
        fetchReceivedLeads({
          offset: values.page * finalItemsOnPage,
          limit: finalItemsOnPage,
          firstName: values.firstName,
          lastName: values.lastName,
          company:
            companiesActive?.key !== notChosenItem.key && companiesActive?.value ? companiesActive.value : undefined,
          installment:
            installmentActive?.key !== notChosenItem.key && installmentActive?.value
              ? Boolean(installmentActive.value)
              : undefined,
          status: statusActive?.key !== notChosenItem.key && statusActive?.value ? statusActive.value : undefined,
          purchaseCountry:
            purchaseCountryActive?.key !== notChosenItem.key && purchaseCountryActive?.value
              ? purchaseCountryActive.value.toString()
              : '',
          leadGeolocation:
            leadGeolocationActive?.key !== notChosenItem.key && leadGeolocationActive?.value
              ? leadGeolocationActive.value.toString()
              : '',
          // excel: true,
        }),
      );
    },

    [values, dispatch, user],
  );

  useEffect(() => {
    onSubmit(new Event('submit'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.page, refetch, values.itemsOnPage]);

  useEffect(() => {
    // защита от сильной связанности пагинатора с остальными фильтрами
    if (values.page > pageCount - 1 && pageCount - 1 >= 0) onPageChanged(pageCount - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.page, pageCount]);

  return useMemo(
    () => ({
      outputState: {
        pageCount,
        count,
      },
      inputState: {
        values,
        handleDownloadClick,
        handleChange,
        handleCheckboxChange,
        onChangeSortTableRow,
        onChangeLeadGeolocation,
        onChangePurchaseCountry,
        onChangeStatus,
        onChangeInstallment,

        onPageChanged,
        onSubmit,
        onItemsOnPageChanged,
      },
      loading,
    }),
    [
      // items,
      pageCount,
      count,
      values,
      loading,
      handleDownloadClick,
      handleChange,
      handleCheckboxChange,
      onChangeSortTableRow,
      onChangeLeadGeolocation,
      onChangePurchaseCountry,
      onChangeStatus,
      onChangeInstallment,

      onPageChanged,
      onSubmit,
      onItemsOnPageChanged,
    ],
  );
};

export default useModel;
