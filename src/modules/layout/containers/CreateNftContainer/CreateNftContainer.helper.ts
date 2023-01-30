/* eslint-disable no-unsafe-optional-chaining */
import { FileError, FileWithPath } from 'react-dropzone';
import { Listings } from 'modules/create/containers';
import * as Yup from 'yup';

import { audioTypes, imagesTypes, modelTypes, videosTypes } from '../FileUploader/FileUploader.helper';

import { IFormInputs } from './CreateNftContainer';

Yup.addMethod(Yup.array, 'both', function yupUnique(message, mapper, pathCreator) {
  return this.test('unique', message, function yupUniqueTest(list) {
    const mappedList = list?.map(mapper);

    if (!mappedList) {
      return true;
    }

    for (let i = 0; i < mappedList.length; i += 1) {
      const item = mappedList[i];
      const firstIndex = mappedList.indexOf(item);
      const lastIndex = mappedList.lastIndexOf(item);
      if (firstIndex !== lastIndex) {
        return this.createError({
          path: pathCreator(lastIndex),
          message,
        });
      }
    }
    return true;
  });
});

export const allFileTypesArray = [
  ...Object.keys(imagesTypes).map((key) => key),
  ...Object.keys(videosTypes).map((key) => key),
  ...Object.keys(audioTypes).map((key) => key),
  ...Object.keys(modelTypes).map((key) => key),
];

export const allFileTypesRequiringCoverArray = [
  ...Object.keys(videosTypes).map((key) => key),
  ...Object.keys(audioTypes).map((key) => key),
  ...Object.keys(modelTypes).map((key) => key),
];

export const MAX_FILE_SIZE = 50;
export const MAX_FILE_SIZE_5 = 5;

export function checkIfFilesAreTooBig(fileSize: number, file?: FileWithPath): boolean {
  const size = (file?.size || 0) / 1024 / 1024;
  return size < fileSize;
}

export function checkIfFilesAreCorrectType(file?: FileWithPath): boolean {
  let innerType = file?.type;
  if (file?.type === '') {
    const slpittedFilePath = file?.path?.split('.');
    innerType = slpittedFilePath?.[slpittedFilePath?.length - 1] || '';
  }

  return allFileTypesArray.includes(innerType || '');
}

export function checkIfFilesAreImageTypes(file?: File): boolean {
  return Object.keys(imagesTypes).includes(file?.type || '');
}
export function checkIfCoverIsRequired(file?: FileWithPath): boolean {
  let innerType = file?.type;
  if (file?.type === '') {
    const slpittedFilePath = file?.path?.split('.');
    innerType = slpittedFilePath?.[slpittedFilePath?.length - 1] || '';
  }
  return allFileTypesRequiringCoverArray.includes(innerType || '');
}

export const fileValidation = (file: File, fileSize: number): FileError | FileError[] | null => {
  if (!checkIfFilesAreTooBig(fileSize, file)) {
    return {
      code: 'file-size-too-large',
      message: `File size is larger than ${fileSize} mb`,
    };
  }

  if (!checkIfFilesAreCorrectType(file)) {
    return {
      code: 'wrong-file-type',
      message: `Wrong file type`,
    };
  }
  return null;
};

export const validationSchema = Yup.object({
  name: Yup.string().min(1).max(50).required(),
  description: Yup.string().min(0).max(500).notRequired(),
  media: Yup.mixed()
    .required('File is required')
    .test('is-correct-file', 'Invalid file type', checkIfFilesAreCorrectType)
    .test('is-big-file', 'File too big', (file) => checkIfFilesAreTooBig(MAX_FILE_SIZE, file)),
  totalSupply: Yup.number().max(10000).required(),
  sellingQuantity: Yup.number().max(Yup.ref('totalSupply'), 'Quantity must be lower than total supply'),
  preview: Yup.mixed().when('media', {
    is: (media) => checkIfCoverIsRequired(media),
    then: Yup.mixed()
      .required('Must provide preview')
      .test('is-correct-file', 'Invalid file type', checkIfFilesAreImageTypes),
  }),
  category: Yup.number().min(1).required('Choose a category'),
  details: Yup.array()
    .of(
      Yup.object()
        .shape({
          name: Yup.string(),
          type: Yup.string(),
        })
        .test({
          name: 'Both or no fields should be filled',
          test: (detail) => {
            const check = Object.values(detail).reduce(
              (acc, currentDetailValue) => {
                if (currentDetailValue?.length) {
                  acc.isOneFieldFilled = true;
                } else {
                  acc.isOneFieldEmpty = true;
                }

                return acc;
              },
              { isOneFieldFilled: false, isOneFieldEmpty: false },
            );
            if (check.isOneFieldEmpty && check.isOneFieldFilled) {
              return false;
            }

            return true;
          },
        }),
    )
    .test('same types', 'Field "Type" must be unique', (details = []) => {
      const uniqueTypeFields = new Set(details.map((detail) => detail.type));
      return uniqueTypeFields.size === details.length;
    }),
});

export const formDefaultValues: IFormInputs = {
  name: '',
  category: 0,
  description: '',
  details: [{ name: '', type: '' }],
  totalSupply: 1,
};

export const convertToFormRequestData = (data: IFormInputs) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.totalSupply) {
    formData.append('total_supply', String(data?.totalSupply));
  }

  formData.append('description', String(data?.description));
  formData.append('collection', String(data?.collection));
  formData.append('category', String(data?.category));
  formData.set('media', data?.media as Blob);
  if (data?.preview) {
    formData.set('cover', data?.preview);
  }

  let detailData = {};

  if (data?.details?.[0].name?.length) {
    detailData = data?.details.reduce((accumulatedDetails: Record<string, string>, { type, name }) => {
      if (type.length && name.length) {
        return {
          ...accumulatedDetails,
          [type]: name,
        };
      }
      return accumulatedDetails;
    }, {});
  }
  formData.set('details', JSON.stringify(detailData));

  if (data?.saleType) {
    formData.append('selling_quantity', String(data?.sellingQuantity || '1'));
    formData.append('currency', String(data?.currency?.symbol));
    formData.append('selling', 'true');
    if (data?.saleType === Listings.Price) {
      formData.append('price', String(data?.price));
    } else {
      formData.append('minimal_bid', String(data?.price));
    }
    if (data.auctionTimestamp) {
      const startAuction = Math.round(Date.now() / 1000);
      formData.append('start_auction', String(startAuction));
      formData.append('collection', String(startAuction + data.auctionTimestamp));
    }
  }

  return formData;
};
