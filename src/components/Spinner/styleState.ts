import { CSSProperties } from 'react';
import { SpinnerSizeProps } from 'types';

const sizeState: Record<SpinnerSizeProps, CSSProperties> = {
  s: {
    width: '87px',
  },
  xl: {
    width: '600px',
  },
};

const positionState = {
  center: {
    position: 'fixed',
    top: '50%',
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: 'translate(-50%, -50%)',
  },
  initial: {
    position: 'inherit',
  },
};

export const spinnerStyleState = {
  size: sizeState,
  position: positionState,
};
