import { snakeize } from 'utils';

import { TEditCollection } from '.';

export const convertToFormRequestData = (data: TEditCollection) => {
  const formData = new FormData();
  formData.append('description', String(data?.description));
  formData.append('creator_royalty', String(data?.creatorRoyalty));
  Object.entries(snakeize(data.socials)).forEach(([key, value]: [string, any]) => {
    formData.append(key, value);
  });
  if (data.avatar) {
    formData.set('avatar', data?.avatar as Blob);
  }
  return formData;
};
