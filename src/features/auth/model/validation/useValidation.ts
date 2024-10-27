import { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from 'shared/hooks/useAppSelector';

const useValidation = () => {
  const locale = useAppSelector(state => state.locale.common);
  const [validationError, setValidationErrors] = useState({
    email: '',
    password: '',
    phone: '',
  });

  const validateEmail = useCallback((email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return locale.invalidEmail;
    return '';
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (password.length < 8) return locale.minSymbols;
    if (!/^[A-Za-z0-9]*$/.test(password)) return locale.onlyLatinLettersAndDigits;
    if (!/[A-Za-z]/.test(password)) return locale.atLeastOneLetter;
    if (!/\d/.test(password)) return locale.atLeastOneDigit;
    return '';
  }, []);

  const validatePhone = useCallback((phone: string) => {
    const phonePattern = /^\+?[1-9]\d{5,14}$/;
    if (!phonePattern.test(phone)) return locale.invalidPhone;
    return '';
  }, []);

  const validate = useCallback(
    (values: { email: string; password: string; phone: string }) => {
      const emailError = validateEmail(values.email);
      const passwordError = validatePassword(values.password);
      const phoneError = validatePhone(values.phone);

      setValidationErrors({
        email: emailError,
        password: passwordError,
        phone: phoneError,
      });

      return {
        email: emailError,
        password: passwordError,
        phone: phoneError,
      };
    },
    [validateEmail, validatePassword, validatePhone],
  );

  return useMemo(() => ({ validate, validationError }), [validate, validationError]);
};

export default useValidation;
