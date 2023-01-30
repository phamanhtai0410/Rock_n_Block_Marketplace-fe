import { IFormInputs } from 'modules/layout/containers/CollectionContainer';
import { snakeize } from 'utils';

export const convertValuesToFormData = (data: IFormInputs) => {
  const formData = new FormData();
  formData.append('name', String(data?.name));
  formData.append('description', String(data?.description));
  formData.append('symbol', String(data?.symbol));
  formData.append('standard', String(data?.standard));
  formData.append('creator_royalty', String(data?.creatorRoyalty));
  Object.entries(snakeize(data.socials)).forEach(([key, value]: [string, any]) => {
    formData.append(key, value);
  });
  if (data.avatar) {
    formData.set('avatar', data?.avatar as Blob);
  }
  if (data.gameSubcategoryId) {
    formData.append('game_subcategory_id', String(data.gameSubcategoryId));
  }
  return formData;
};
