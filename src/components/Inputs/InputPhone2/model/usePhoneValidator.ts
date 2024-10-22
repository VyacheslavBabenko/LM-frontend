import { useCallback } from 'react';
import startsWith from 'lodash.startswith';

interface IUsePhoneValidatorProps {
  setIsValid?: (value: boolean) => void;
}

type IsValid = (
  value: string,
  country: { dialCode: string; format: string },
  countries: { dialCode: string; format: string }[],
  hiddenAreaCodes: object[],
) => string | boolean;

// ACHTUNG: валидатор рработает через жепу для некоторых стран, использовать с осторожностью
const usePhoneValidator = ({ setIsValid }: IUsePhoneValidatorProps) => {
  const memoIsValid = useCallback<IsValid>(
    (inputNumber, country, countries) => {
      console.log(inputNumber);
      if (!setIsValid) return true;
      const isNeededCode = countries.some(country2 => {
        const result = startsWith(inputNumber, country2.dialCode) || startsWith(country2.dialCode, inputNumber);
        return result;
      });
      const neededLength = country.format?.split('').filter(c => c === '.').length;
      const isNeededLength = neededLength === inputNumber.length;
      setIsValid(isNeededCode && isNeededLength);
      return isNeededCode && isNeededLength;
    },
    [setIsValid],
  );

  return memoIsValid as
    | boolean
    | ((value: string, country: object, countries: object[], hiddenAreaCodes: object[]) => string | boolean)
    | undefined;
};

export default usePhoneValidator;
