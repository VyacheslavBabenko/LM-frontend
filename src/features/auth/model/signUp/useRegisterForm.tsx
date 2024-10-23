import { useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useAppDispatch } from 'store/store';
import { registerUser } from 'store/auth/authThunks';
import useValidation from '../validation/useValidation';
import { getNoneSelectItem } from 'features/transferLead/model/data';
import { formatCompaniesToFinder } from './data';
import { CustomChangeEvent } from 'shared/helpers/types';

const useRegisterForm = () => {
  const dispatch = useAppDispatch();
  const { validationError, validate } = useValidation();

  const { loading } = useAppSelector(state => state.auth, shallowEqual);
  const companies = useAppSelector(state => state.users.companies);
  const locale = useAppSelector(state => state.locale.common);

  const notChosenItem = useMemo(() => getNoneSelectItem(locale.notChosen), [locale]);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: [notChosenItem],
    email: '',
    password: '',
  });

  useEffect(() => {
    setValues({
      ...values,
      company: [notChosenItem, ...formatCompaniesToFinder(companies)],
    });
  }, [companies, locale]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onChangeCompany = useCallback((value: typeof values.company) => {
    setValues(ps => ({
      ...ps,
      company: value,
    }));
  }, []);

  const disabled = useMemo(
    () =>
      values.email === '' ||
      values.password === '' ||
      values.firstName === '' ||
      values.lastName === '' ||
      values.phone === '' ||
      values.company.find(el => el.active)?.key === notChosenItem.key ||
      loading,
    [
      values.password,
      values.email,
      values.company,
      values.firstName,
      values.lastName,
      values.phone,
      loading,
      notChosenItem,
    ],
  );
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const companyActive = values.company.find(el => el.active)?.value;

      const { email, password, phone } = validate(values);
      if (email === '' && password === '' && phone === '' && !disabled && companyActive) {
        const info = {
          ...values,
          phone: Number(values.phone),
          company: companyActive?.toString() || '',
        };
        dispatch(registerUser(info));
      }
    },
    [validate, values, disabled, dispatch],
  );

  return useMemo(
    () => ({
      values,
      validationError,
      disabled,
      onChangeCompany,
      handleChange,
      onSubmit,
    }),
    [values, validationError, disabled, onChangeCompany, handleChange, onSubmit],
  );
};

export default useRegisterForm;
