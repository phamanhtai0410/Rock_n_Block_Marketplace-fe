import { addressValidationSchema } from 'modules/games/containers';
import * as Yup from 'yup';

export const initialFormValues = {
  name: '',
  addresses: [{ address: '' }],
};

export type AddSubcategoryFormType = {
  name: string;
  addresses: Array<{ address: string }>;
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).max(50).required(),
  addresses: addressValidationSchema,
});
