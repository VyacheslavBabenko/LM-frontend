import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { defaultItemsOnPage } from 'components/FilterHeader/data';

import { initialAllUsersSort, useInstallmentItems, useLeadStatusItems } from './data';
import { useAppDispatch, useAppSelector } from 'shared/hooks/useAppSelector';
import { downloadTransferredLeadsExcel, fetchTransferredLeads } from 'store/leads/transferredLeads/transferredLeads';
import { countryItems, formatUsersToFinder, getNoneSelectItem } from 'features/transferLead/model/data';
import { fetchUsers } from 'store/users/usersSlice';
import { formatCompaniesToFinder } from 'features/auth/model/signUp/data';
import { shallowEqual } from 'react-redux';

const useModel = () => {
  const dispatch = useAppDispatch();
  const leadStatusItems = useLeadStatusItems();
  const installmentItems = useInstallmentItems();

  const count = useAppSelector(state => state.transferredLeads.count);
  const { refetch, loading } = useAppSelector(state => state.transferredLeads, shallowEqual);
  const locale = useAppSelector(state => state.locale.common);
  const { users, companies } = useAppSelector(state => state.users, shallowEqual);

  const notChosenItem = useMemo(() => getNoneSelectItem(locale.notChosen), [locale]);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    company: [notChosenItem],
    installment: [notChosenItem, ...installmentItems],
    recipient: [notChosenItem],
    leadGeolocation: [notChosenItem, ...countryItems],
    purchaseCountry: [notChosenItem, ...countryItems],
    statuses: [notChosenItem, ...leadStatusItems],
    sortTableRow: initialAllUsersSort,

    page: 0,
    itemsOnPage: defaultItemsOnPage,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      recipient: [notChosenItem, ...formatUsersToFinder(users)],
    });
  }, [users, locale]);

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

  const onChangeSortTableRow = useCallback(
    (value: typeof values.sortTableRow) => setValues(ps => ({ ...ps, sortTableRow: value })),
    [],
  );

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

  const onChangeRecipient = useCallback((value: typeof values.recipient) => {
    setValues(ps => ({
      ...ps,
      recipient: value,
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

  const onChangeCompany = useCallback((value: typeof values.company) => {
    setValues(ps => ({
      ...ps,
      company: value,
    }));
  }, []);

  const onChangeStatus = useCallback(
    (value: typeof values.statuses) => setValues(ps => ({ ...ps, statuses: value })),
    [],
  );

  const onChangeInstallment = useCallback(
    (value: typeof values.installment) => setValues(ps => ({ ...ps, installment: value })),
    [],
  );

  const onPageChanged = useCallback(
    (value: typeof values.page) =>
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
        downloadTransferredLeadsExcel({
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

      const recipientActive = values.recipient.find(el => el.active);
      const purchaseCountryActive = values.purchaseCountry.find(el => el.active);
      const leadGeolocationActive = values.leadGeolocation.find(el => el.active);
      const statusActive = values.statuses.find(el => el.active);
      const installmentActive = values.installment.find(el => el.active);
      const companiesActive = values.company.find(el => el.active);

      dispatch(
        fetchTransferredLeads({
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
          recipientID:
            recipientActive?.key !== notChosenItem.key && recipientActive?.value
              ? recipientActive.value.toString()
              : '',
        }),
      );
    },

    [values, dispatch],
  );

  useEffect(() => {
    onSubmit(new Event('submit'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.page, values.sortTableRow, refetch, values.itemsOnPage]);

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
        onChangeRecipient,
        onChangeLeadGeolocation,
        onChangePurchaseCountry,
        onChangeStatus,
        onChangeInstallment,
        onChangeCompany,

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
      onChangeRecipient,
      onChangeLeadGeolocation,
      onChangePurchaseCountry,
      onChangeStatus,
      onChangeInstallment,
      onChangeCompany,

      onPageChanged,
      onSubmit,
      onItemsOnPageChanged,
    ],
  );
};

export default useModel;
