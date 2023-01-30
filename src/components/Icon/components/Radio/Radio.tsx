import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Radio: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 24 24"
    sx={{
      ...sx,
      width: '24px',
      height: '24px',
    }}
  >
    <rect width="24" height="24" rx="12" fill="#E039FD" />
    <g filter="url(#filter0_dd_1275_25293)">
      <circle cx="12" cy="12" r="6" fill="#FAFAFC" />
    </g>
    <defs>
      <filter
        id="filter0_dd_1275_25293"
        x="3"
        y="4"
        width="18"
        height="18"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1275_25293" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
        <feBlend mode="normal" in2="effect1_dropShadow_1275_25293" result="effect2_dropShadow_1275_25293" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1275_25293" result="shape" />
      </filter>
    </defs>
  </SvgIcon>
);
