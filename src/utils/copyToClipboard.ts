export const copyToClipboard = async (textToCopy: string) => {
  return navigator.clipboard
    .writeText(textToCopy)
    .then(() => true)
    .catch(() => false);
};
