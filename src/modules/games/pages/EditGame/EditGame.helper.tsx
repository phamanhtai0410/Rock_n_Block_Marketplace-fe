import { socialsValidation } from 'modules/layout/containers';
import {
  COLOR_BG,
  COLOR_DARK_PURPLE,
  COLOR_GOLD,
  COLOR_GREEN_DARK,
  COLOR_GREEN_DEFAULT,
  COLOR_NEUTRALS_1,
  COLOR_NEUTRALS_4,
  COLOR_NEUTRALS_5,
  COLOR_NEUTRALS_8,
  COLOR_PRIMARY_2,
  COLOR_SECONDARY_3,
} from 'theme/colors';
import * as yup from 'yup';

export interface IEditGameFormInputs {
  name?: string;
  email?: string;
  backgroundColor?: string;
  description?: string;
  site?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
  discord?: string;
  medium?: string;
}

export const gameValidationSchema = socialsValidation.concat(
  yup.object().shape({
    name: yup.string().min(1).max(50).required(),
    email: yup.string().email().max(50),
    backgroundColor: yup.string(),
    description: yup.string().min(0).max(500),
  }),
);

export const backgroundColorsVariants = [
  { value: COLOR_NEUTRALS_8, label: 'White' },
  { value: COLOR_SECONDARY_3, label: 'Yellow' },
  { value: COLOR_PRIMARY_2, label: 'Purple' },
  { value: COLOR_NEUTRALS_1, label: 'Deep Purple' },
  { value: COLOR_GREEN_DARK, label: 'Green' },
  { value: COLOR_BG, label: 'Dark' },
];

export const backgroundCardColor = {
  [COLOR_NEUTRALS_8]: COLOR_NEUTRALS_5,
  [COLOR_SECONDARY_3]: COLOR_GOLD,
  [COLOR_PRIMARY_2]: COLOR_DARK_PURPLE,
  [COLOR_NEUTRALS_1]: COLOR_NEUTRALS_4,
  [COLOR_GREEN_DARK]: COLOR_GREEN_DEFAULT,
  [COLOR_BG]: COLOR_BG,
};
