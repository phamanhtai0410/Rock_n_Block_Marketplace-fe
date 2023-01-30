import { FC } from 'react';
import { Link, SxProps, Theme, Typography } from '@mui/material';
import { Globe } from 'components/Icon/components';
import { getFullUrl } from 'components/ProfileInfoCard';
import { FontWeights } from 'theme/Typography';

export type SiteProps = {
  site: string;
  sx?: SxProps<Theme>;
};

export const Site: FC<SiteProps> = ({ site, sx }) => {
  return (
    <Link
      href={getFullUrl(site)}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, ...sx }}
    >
      <Globe sx={{ marginRight: 1 }} />
      <Typography className="s" noWrap sx={{ fontWeight: FontWeights.fontWeightBold, ...sx }}>
        {getFullUrl(site)}
      </Typography>
    </Link>
  );
};
