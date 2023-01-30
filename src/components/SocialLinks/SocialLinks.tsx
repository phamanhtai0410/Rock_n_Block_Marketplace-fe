import { FC } from 'react';
import { Link, Stack, StackProps, styled, useTheme } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Pinterest, Twitter } from 'components/Icon/components';
import { COLOR_NEUTRALS_6 } from 'theme/colors';
import { BORDER_RADIUS_EXTRA_SMALL } from 'theme/variables';

import { LinksProps } from './SocialLinks.types';

type SocialLinksProps = {
  color?: string;
  links: LinksProps;
  withBox?: boolean;
};

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: theme.themeColors.colorIconsBackground,
  borderRadius: BORDER_RADIUS_EXTRA_SMALL,
}));

export const SocialLinks: FC<SocialLinksProps & StackProps> = ({ links, color = COLOR_NEUTRALS_6, ...stackProps }) => {
  const { facebook, instagram, twitter, linkedIn } = links;
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1} {...stackProps}>
      {facebook && (
        <LinkStyled href={facebook} target="_blank" rel="noreferrer">
          <Facebook sx={{ path: { fill: theme.themeColors.colorIcons } }} />
        </LinkStyled>
      )}
      {instagram && (
        <Link href={instagram} target="_blank" rel="noreferrer">
          <Instagram sx={{ path: { fill: theme.themeColors.colorIcons } }} />
        </Link>
      )}
      {twitter && (
        <LinkStyled href={twitter} target="_blank" rel="noreferrer">
          <Twitter sx={{ path: { fill: theme.themeColors.colorIcons } }} />
        </LinkStyled>
      )}
      {linkedIn && (
        <LinkStyled href={linkedIn} target="_blank" rel="noreferrer">
          <LinkedIn sx={{ path: { fill: theme.themeColors.colorIcons } }} />
        </LinkStyled>
      )}
    </Stack>
  );
};
