import { FC } from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { ArrowLeft } from 'components/Icon/components';

interface NavigationButtonsProps {
  leftButtonProps?: IconButtonProps;
  rightButtonProps?: IconButtonProps;
}

export const NavigationButtons: FC<NavigationButtonsProps> = ({ leftButtonProps, rightButtonProps }) => {
  return (
    <>
      <IconButton className="borderHover" aria-label="Previous" {...leftButtonProps}>
        <ArrowLeft />
      </IconButton>
      <IconButton className="borderHover" aria-label="Next" {...rightButtonProps}>
        <ArrowLeft style={{ transform: 'rotate(180deg)' }} />
      </IconButton>
    </>
  );
};
