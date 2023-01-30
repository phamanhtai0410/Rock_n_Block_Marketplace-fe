import { FC } from 'react';
import { SxProps, Theme } from '@mui/material';
import { Loading, LoadingSimple } from 'components/Icon/components';
import { SpinnerPositionProps, SpinnerSizeProps } from 'types';

import { spinnerStyleState } from './styleState';

export interface SpinnerProps {
  size?: SpinnerSizeProps;
  position?: SpinnerPositionProps;
  type?: 'default' | 'simple';
  sx?: SxProps<Theme>;
}

export const Spinner: FC<SpinnerProps> = ({ size = 's', position = 'initial', type = 'default', sx }) => {
  if (type === 'default') {
    return (
      <Loading
        sx={{
          ...spinnerStyleState.size[size],
          ...spinnerStyleState.position[position],
          animation: 'rotate 1s linear infinite',
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0)',
            },
            '100%': {
              transform: 'rotate(1turn)',
            },
          },
        }}
      />
    );
  }
  return (
    <LoadingSimple
      sx={{
        animation: 'rotate 2s linear infinite',
        '@keyframes rotate': {
          '0%': {
            transform: 'rotate(0)',
          },
          '100%': {
            transform: 'rotate(1turn)',
          },
        },
      }}
    />
  );
};
