import { addressValidationSchema } from 'modules/games/containers';
import * as Yup from 'yup';

export const initialFormValues = {
  addresses: [{ address: '' }],
};

export const validationSchema = Yup.object().shape({
  addresses: addressValidationSchema,
});
