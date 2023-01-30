export enum ValidationTypes {
  number = 'number',
  int = 'int',
  string = 'string',
}

export interface InputProps {
  decimals?: number;
  maxValue?: number;
  type: ValidationTypes;
}

export interface IValidateParams {
  value: string;
  isInteger?: boolean;
  decimals?: number;
}
