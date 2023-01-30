import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { COLOR_NEUTRALS_5 } from 'theme/colors';

export const AuctionIcon: FC<SvgIconProps> = ({ sx, fill = COLOR_NEUTRALS_5, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 24 24"
    sx={{
      width: '24px',
      height: '24px',
      ...sx,
      '& > path': {
        fill,
      },
    }}
  >
    <path d="M10.6667 16.6668V18.3334H0.666748V16.6668H10.6667ZM11.1551 0.571777L17.6367 7.05344L16.4584 8.23344L15.5751 7.93844L13.5109 10.0001L18.2251 14.7143L17.0467 15.8926L12.3334 11.1784L10.3301 13.1818L10.5659 14.1251L9.38675 15.3034L2.90508 8.82178L4.08425 7.64344L5.02591 7.87844L10.2709 2.63428L9.97675 1.75094L11.1551 0.571777ZM11.7442 3.51844L5.85175 9.41011L8.79758 12.3568L14.6901 6.46511L11.7442 3.51844Z" />
  </SvgIcon>
);
