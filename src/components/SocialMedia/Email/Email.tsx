import { FC } from 'react';
import { Link, SxProps, Theme, Typography } from '@mui/material';
import { Mail } from 'components/Icon/components';
import { FontWeights } from 'theme/Typography';

export type EmailProps = {
  email: string;
  sx?: SxProps<Theme>;
};

export const Email: FC<EmailProps> = ({ email, sx }) => {
  return (
    <Link
      href={`mailto:${email}`}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, ...sx }}
    >
      <Mail sx={{ marginRight: 1 }} />
      <Typography className="s" noWrap sx={{ fontWeight: FontWeights.fontWeightBold, ...sx }}>
        {email}
      </Typography>
    </Link>
  );
};
