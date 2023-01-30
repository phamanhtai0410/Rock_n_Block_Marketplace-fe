export const getEmbedYoutubeLink = (url: string | null) => {
  if (url) {
    const stringArr = url.split('watch?v=');
    return stringArr.join('embed/');
  }
  return '';
};
