import { addressValidationSchema } from 'modules/games/containers/CategoryContainer';
import { Subcategory } from 'modules/games/containers/ListGameForm';
import * as Yup from 'yup';

export interface ICollectionContainer extends Pick<Subcategory, 'addresses'> {
  name: string;
}

export type GameCollectionContainerProps = {
  isEditPage?: boolean;
  isStatusRequest?: boolean;
  onSubmit: (data: any) => void;
  formValues: any;
};

export const collectionValidationSchema = Yup.object().shape({
  name: Yup.string().min(1).max(50).required(),
  addresses: addressValidationSchema,
});
