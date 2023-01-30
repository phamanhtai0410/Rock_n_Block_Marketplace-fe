export enum Color {
  Pink = 'pink',
  Green = 'green',
  Black = 'black',
}

export const getColor = (index: number) => {
  if (index === 0 || index === 1) {
    return Color.Pink;
  }
  if (index === 2) {
    return Color.Green;
  }
  return Color.Black;
};
