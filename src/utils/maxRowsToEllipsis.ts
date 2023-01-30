export const maxRowsToEllipsis = (maxRowsToShow: string) => ({
  display: '-webkit-box',
  WebkitLineClamp: maxRowsToShow,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});
