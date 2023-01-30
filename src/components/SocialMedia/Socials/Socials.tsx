import { FC } from 'react';
import { Telegram } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Discord, FacebookOutlined, Globe, Instagram, Medium, Twitter } from 'components/Icon/components';
import { COLOR_NEUTRALS_4 } from 'theme/colors';

export type SocialsProps = {
  site?: string;
  instagram?: string;
  discord?: string;
  telegram?: string;
  medium?: string;
  twitter?: string;
  facebook?: string;
};

export const Socials: FC<SocialsProps> = ({ site, instagram, facebook, discord, telegram, medium, twitter }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3, a: { color: COLOR_NEUTRALS_4 } }}>
      {site && (
        <a href={site} target="_blank" rel="noreferrer">
          <Globe />
        </a>
      )}
      {twitter && (
        <a href={`https://twitter.com/${twitter.replaceAll('@', '')}`} target="_blank" rel="noreferrer">
          <Twitter />
        </a>
      )}
      {instagram && (
        <a href={`https://www.instagram.com/${instagram.replaceAll('@', '')}/`} target="_blank" rel="noreferrer">
          <Instagram />
        </a>
      )}
      {facebook && (
        <a href={`https://facebook.com/${facebook}`} target="_blank" rel="noreferrer">
          <FacebookOutlined />
        </a>
      )}
      {discord && (
        <a href={discord} target="_blank" rel="noreferrer">
          <Discord />
        </a>
      )}
      {telegram && (
        <a href={telegram} target="_blank" rel="noreferrer">
          <Telegram />
        </a>
      )}
      {medium && (
        <a
          href={`https://medium.com/${medium.charAt(0) === '@' ? medium : `@${medium}`}`}
          target="_blank"
          rel="noreferrer"
        >
          <Medium />
        </a>
      )}
    </Stack>
  );
};
