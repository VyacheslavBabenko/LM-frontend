import { useCallback, useMemo, useState } from 'react';

const useValidation = () => {
  const [validationError, setValidationErrors] = useState({
    email: '',
    password: '',
    phone: '',
  });

  const validateEmail = useCallback((email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return 'invalidEmail';
    return '';
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (password.length < 8) return 'minSymbols';
    if (!/^[A-Za-z0-9]*$/.test(password)) return 'onlyLatinLettersAndDigits';
    if (!/[A-Za-z]/.test(password)) return 'atLeastOneLetter';
    if (!/\d/.test(password)) return 'atLeastOneDigit';
    return '';
  }, []);

  const validatePhone = useCallback((phone: string) => {
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!phonePattern.test(phone)) return 'invalidPhone';
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
    [validateEmail, validatePassword, validatePhone]
  );

  return useMemo(() => ({ validate, validationError }), [validate, validationError]);
};

export default useValidation;
