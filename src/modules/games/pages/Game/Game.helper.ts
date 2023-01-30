export const convertToFormRequestData = (key: string, data: any) => {
  const formData = new FormData();
  if (key === 'banner' && data?.banner) {
    formData.set('banner', data?.banner);
    return formData;
  }
  if (key === 'avatar' && data?.avatar) {
    formData.set('avatar', data?.avatar);
    return formData;
  }
  formData.append(key, data);
  return formData;
};
