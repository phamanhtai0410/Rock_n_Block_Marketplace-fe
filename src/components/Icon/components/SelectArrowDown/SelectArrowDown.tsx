import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const SelectArrowDown: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 12 6"
    sx={{
      ...sx,
      width: '12px',
      height: '6px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3356 0.531506C11.5944 0.854953 11.5419 1.32692 11.2185 1.58568L6.21849 5.58568C5.94458 5.80481 5.55536 5.80481 5.28145 5.58568L0.281451 1.58568C-0.0419951 1.32692 -0.0944367 0.854952 0.164321 0.531506C0.423079 0.208059 0.895047 0.155618 1.21849 0.414375L5.74997 4.03956L10.2815 0.414376C10.6049 0.155619 11.0769 0.20806 11.3356 0.531506Z"
      fill="currentColor"
    />
  </SvgIcon>
);
