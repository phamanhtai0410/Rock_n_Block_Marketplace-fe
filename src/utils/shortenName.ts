import { shortenPhrase } from './shortenPhrase';

const MAX_NAME_LENGTH = 30;

export const shortenName = (name = '') => {
  if ((name?.length || 0) > MAX_NAME_LENGTH) {
    return shortenPhrase(name, 5, 3);
  }
  return name;
};
