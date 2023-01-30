import { IValidateParams } from './index';

export const validateOnlyNumbers = ({ value, isInteger, decimals }: IValidateParams): boolean => {
  const regexpTemplate = String.raw`^\d+(\.)?(\d{0,${decimals || 18}})?$|^$`;
  if ((isInteger && !value.match(/^[+]?[1-9]\d*$/)) || value === '00') {
    return false;
  }
  if (!value.match(regexpTemplate) || value === '00') {
    return false;
  }
  return true;
};
