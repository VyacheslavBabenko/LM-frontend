import { useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { transferLead } from 'store/leads/transferLead/transferLeadSlice';

import { useAppDispatch } from 'store/store';
import { countryItems, formatUsersToFinder, getNoneSelectItem } from './data';
import { fetchUsers } from 'store/users/usersSlice';
import { CustomChangeEvent } from 'shared/helpers/types';

const useTransferLeadModel = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector(state => state.locale.common);

  const notChosenItem = useMemo(() => getNoneSelectItem(locale.notChosen), [locale]);

  const { loading } = useAppSelector(state => state.transferLead, shallowEqual);
  const { users } = useAppSelector(state => state.users, shallowEqual);

  const [values, setValues] = useState({
    recipient: [notChosenItem],
    firstName: '',
    lastName: '',
    phone: '',
    leadGeolocation: [notChosenItem, ...countryItems],
    purchaseCountry: [notChosenItem, ...countryItems],
    details: '',
    purchaseTimeframe: '',
    budget: '',
    installment: false,
    comments: '',
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
      leadGeolocation: [notChosenItem, ...countryItems],
    });
    setValues({
      ...values,
      purchaseCountry: [notChosenItem, ...countryItems],
    });
  }, [locale]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent) => {
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

  const resetForm = useCallback(() => {
    setValues({
      recipient: [notChosenItem],
      firstName: '',
      lastName: '',
      phone: '',
      leadGeolocation: [notChosenItem, ...countryItems],
      purchaseCountry: [notChosenItem, ...countryItems],
      details: '',
      purchaseTimeframe: '',
      budget: '',
      installment: false,
      comments: '',
    });
  }, [notChosenItem]);

  const disabled = useMemo(
    () =>
      values.recipient.find(el => el.active)?.key === notChosenItem.key ||
      !values.firstName ||
      !values.lastName ||
      !values.phone ||
      values.leadGeolocation.find(el => el.active)?.key === notChosenItem.key ||
      values.purchaseCountry.find(el => el.active)?.key === notChosenItem.key ||
      !values.details ||
      !values.purchaseTimeframe ||
      !values.budget ||
      loading,
    [values, loading, notChosenItem],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const info = {
        recipientID: values.recipient.find(el => el.active)?.value,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        leadGeolocation: values.leadGeolocation.find(el => el.active)?.value,
        purchaseCountry: values.purchaseCountry.find(el => el.active)?.value,
        details: values.details,
        purchaseTimeframe: values.purchaseTimeframe,
        budget: values.budget,
        installment: values.installment,
        comments: values.comments,
        status: 1,
      };

      if (!disabled) {
        dispatch(transferLead(info));
        resetForm();
      }
    },
    [disabled, values, dispatch, resetForm],
  );

  return useMemo(
    () => ({
      values,
      disabled,
      loading,
      handleChange,
      handleCheckboxChange,
      onChangeRecipient,
      onChangeLeadGeolocation,
      onChangePurchaseCountry,

      onSubmit,
    }),
    [
      loading,
      values,
      disabled,
      handleChange,
      handleCheckboxChange,
      onChangeRecipient,
      onChangeLeadGeolocation,
      onChangePurchaseCountry,
      onSubmit,
    ],
  );
};

export default useTransferLeadModel;
