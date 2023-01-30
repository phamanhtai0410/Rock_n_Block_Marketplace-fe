import { isPlainObject } from 'lodash';

export const transformPropertiesData = (data: Record<string, any>) => {
  return Object.entries(data).reduce((acc: Array<{ [k: string]: string }>, curr: Record<string, any>) => {
    let res: Record<string, string | any> = {};
    Object.keys(curr).forEach((k) => {
      if (isPlainObject(curr[k])) {
        res = { ...res, ...curr[k] };
      } else {
        res.name = curr[k];
      }
    });
    acc.push(res);
    return acc;
  }, []);
};
