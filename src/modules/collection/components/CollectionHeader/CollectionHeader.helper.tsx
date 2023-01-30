import { FC } from 'react';
import { SvgIconProps } from '@mui/material';
import { Collection } from 'types/api/Collection';

export type TSocialLinks = {
  elementId: number;
  name: keyof Pick<Collection, 'site' | 'twitter' | 'telegram' | 'instagram' | 'discord' | 'medium'>;
  socialLink: (link: string) => string;
  Icon: FC<SvgIconProps>;
};
