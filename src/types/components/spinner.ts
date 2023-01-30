enum SizeValues {
  s,
  xl,
}

enum PositionValues {
  center,
  initial,
}

export type SpinnerSizeProps = keyof typeof SizeValues;
export type SpinnerPositionProps = keyof typeof PositionValues;
