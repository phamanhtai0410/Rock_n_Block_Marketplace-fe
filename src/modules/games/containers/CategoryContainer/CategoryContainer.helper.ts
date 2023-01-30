import { omit, pick } from 'lodash';
import { Subcategory } from 'modules/games/containers/ListGameForm';
import {
  checkIfFilesAreImageTypes,
  checkIfFilesAreTooBig,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_5,
} from 'modules/layout/containers/CreateNftContainer';
import { imagesTypes } from 'modules/layout/containers/FileUploader';
import { GameCategoryType } from 'types';
import { getEncodeMedia, isAddress } from 'utils';
import * as Yup from 'yup';

export type Subcategories = {
  avatar?: File | string | null;
} & Omit<Subcategory, 'avatar'>;

export interface IAddCategoryForm {
  name: string;
  avatar?: File | string | null;
  subcategories: Array<Subcategories>;
}

export const acceptedImageTypes = pick(imagesTypes, ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']);

export const validationMedia = (mediaSize: number) =>
  Yup.mixed()
    .notRequired()
    .test('is-correct-file', 'Invalid file type', (file) => checkIfFilesAreImageTypes(file))
    .test('is-big-file', 'File too big', (file) => checkIfFilesAreTooBig(mediaSize, file));

export const addressValidationSchema = Yup.array().of(
  Yup.object().shape({
    address: Yup.mixed().test('Address validation', 'Invalid address', (address) => isAddress(address)),
  }),
);

export const validationSchema = Yup.object().shape(
  {
    name: Yup.string().min(1).max(50).required(),
    cover: Yup.mixed().when('cover', (val) => {
      if (val && val.length > 0) {
        return validationMedia(MAX_FILE_SIZE_5);
      }
      return Yup.mixed().notRequired();
    }),
    subcategories: Yup.array().of(
      Yup.object().shape(
        {
          name: Yup.string().min(1, 'must be at least 1 characters').max(50, 'max 50').required('Name is required'),
          cover: Yup.mixed().when('cover', (val) => {
            if (val && val.length > 0) {
              return validationMedia(MAX_FILE_SIZE);
            }
            return Yup.mixed().notRequired();
          }),
          addresses: addressValidationSchema,
        },
        [['cover', 'cover']],
      ),
    ),
  },
  [['cover', 'cover']],
);

export const formatDataForRequest = async (data: IAddCategoryForm) => {
  const convertedCover = data.avatar instanceof Blob && ((await getEncodeMedia(data?.avatar)) as string);

  const convertedSubcategories = await Promise.all(
    data.subcategories.map(async (subcategory) => {
      const omittedSubcategory = omit(subcategory, 'addresses', 'collections');
      const image = subcategory.avatar;

      if (image && image instanceof Blob) {
        const encodedFile = (await getEncodeMedia(image)) as string;

        return {
          ...omittedSubcategory,
          avatar: encodedFile,
        };
      }

      return {
        ...omittedSubcategory,
        avatar: null,
        removeAvatar: !image,
      };
    }),
  );
  return {
    ...data,
    avatar: convertedCover || null,
    removeAvatar: !(convertedCover === null || data.avatar),
    subcategories: convertedSubcategories,
  };
};

export const renameAddressKey = (data: GameCategoryType['subcategories']): IAddCategoryForm['subcategories'] =>
  data?.map(({ addressList: addresses, ...rest }) => ({
    addresses,
    ...rest,
  }));
