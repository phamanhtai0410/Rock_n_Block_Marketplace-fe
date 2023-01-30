import { snakeize } from 'utils';

type Props<T> = {
  data: T;
  excludingKeyArray?: string[];
  isNestedObjects?: boolean;
};

export function formatCollectionData<T>({ data, excludingKeyArray = [''], isNestedObjects }: Props<T>) {
  const newFormData = new FormData();
  Object.entries(snakeize(data)).forEach(([key, value]: [string, any]) => {
    if (excludingKeyArray.includes(key)) {
      newFormData.append(key, value);
      return;
    }
    if (typeof value === 'object' && !excludingKeyArray.includes(key) && isNestedObjects) {
      Object.entries(value).forEach(([nestedObjKey, nestedObjValue]: [string, any]) => {
        newFormData.append(nestedObjKey, nestedObjValue);
      });
    } else {
      newFormData.append(key, value);
    }
  });
  return newFormData;
}
