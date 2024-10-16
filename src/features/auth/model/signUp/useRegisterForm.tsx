import { useCallback, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useAppDispatch } from 'store/store';
import { registerUser } from 'store/auth/authThunks';
import useValidation from '../validation/useValidation';

const useRegisterForm = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.auth, shallowEqual);

  const { validationError, validate } = useValidation();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    email: '',
    password: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Проверка для поля "phone" - только цифры
    if (name === 'phone') {
      const onlyNumbers = value.replace(/[^\d+]/g, '');
      setValues((prevValues) => ({
        ...prevValues,
        [name]: onlyNumbers,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value.trim(),
      }));
    }
  }, []);

  const disabled = useMemo(
    () =>
      values.email === '' ||
      values.password === '' ||
      values.firstName === '' ||
      values.lastName === '' ||
      values.phone === '' ||
      values.company === '' ||
      loading,
    [
      values.password,
      values.email,
      values.company,
      values.firstName,
      values.lastName,
      values.phone,
      loading,
    ]
  );
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const { email, password, phone } = validate(values);

      if (email === '' || password === '' || phone === '') {
        const info = {
          ...values,
          phone: Number(values.phone),
        };
        if (!disabled) dispatch(registerUser(info));
      }
    },
    [validate, values, disabled, dispatch]
  );

  return useMemo(
    () => ({
      values,
      validationError,
      disabled,
      handleChange,
      onSubmit,
    }),
    [values, validationError, disabled, handleChange, onSubmit]
  );
};

export default useRegisterForm;
