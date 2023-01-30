export const getFormattedCounterDate = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  }
  return date;
};
