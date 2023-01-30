import { shortenName } from './shortenName';

export const updateTextWithVars = (varsConfig: Record<string, string | number>, text: string) => {
  const updatedText = Object.entries(varsConfig).reduce((acc, [key, value]) => {
    return acc.replace(`{{ ${key} }}`, String(key === 'name' ? shortenName(String(value)) : value));
  }, text);
  return updatedText;
};
