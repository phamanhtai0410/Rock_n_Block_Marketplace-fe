import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

import { InputProps, validateOnlyNumbers, ValidationTypes } from './index';

export const useValidateInputField = (
  options: InputProps,
): [string, ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>, (value: string) => void] => {
  const { type, decimals, maxValue } = options ?? {};
  const [inputValue, setInputValue] = useState('');

  const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = event.target;

    if (value === '' || type === ValidationTypes.string) {
      setInputValue(value);
    }

    if (type === ValidationTypes.number) {
      const isNumber = validateOnlyNumbers({ value, decimals: decimals || 18 });
      const maxNumberValue = maxValue ? Number(maxValue) : Infinity;
      if (isNumber && Number(value) <= maxNumberValue) {
        setInputValue(value);
      }
    }

    if (type === ValidationTypes.int) {
      const isInteger = validateOnlyNumbers({ value, isInteger: true, decimals: decimals || 18 });
      if (isInteger) {
        setInputValue(value);
      }
    }
  };

  const handleSetOriginValue = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return [inputValue, handleChangeValue, handleSetOriginValue];
};
