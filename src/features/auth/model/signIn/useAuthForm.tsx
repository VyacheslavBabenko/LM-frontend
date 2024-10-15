import { useCallback, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useAppDispatch } from 'store/store';
import { loginUser } from 'store/auth/authThunks';

const useAuthForm = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.auth, shallowEqual);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChangeEmail = useCallback(
    (value: string) => setValues((ps) => ({ ...ps, email: value })),
    []
  );

  const onChangePassword = useCallback(
    (value: string) => setValues((ps) => ({ ...ps, password: value })),
    []
  );

  const disabled = useMemo(
    () => values.email === '' || values.password === '' || loading,
    [values.password, values.email, loading]
  );
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const info = {
        email: values.email,
        password: values.password,
      };

      if (!disabled) dispatch(loginUser(info));
    },
    [values.email, values.password, disabled, dispatch]
  );

  return useMemo(
    () => ({
      values,
      disabled,
      onChangeEmail,
      onChangePassword,
      onSubmit,
    }),
    [values, disabled, onChangeEmail, onChangePassword, onSubmit]
  );
};

export default useAuthForm;
