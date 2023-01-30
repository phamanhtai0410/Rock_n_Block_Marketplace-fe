import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Typography, useTheme } from '@mui/material';
import { BreadcrumbsPath } from 'modules/layout/hooks/useBreadcrumbs';
import { COLOR_NEUTRALS_5 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { BORDER_RADIUS_MEDIUM } from 'theme/variables';
import { shortenPhrase } from 'utils';

export type BreadcrumbsProps = {
  breadcrumbsRoutes: BreadcrumbsPath[];
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbsRoutes }) => {
  const theme = useTheme();
  return (
    <MuiBreadcrumbs
      sx={{
        position: 'relative',
        width: 'fit-content',
        py: 0.25,
        px: 1,
        mb: 8,
        zIndex: 99,
        borderRadius: BORDER_RADIUS_MEDIUM,
        backgroundColor: theme.themeColors.colorBackground,
      }}
    >
      <Link to="/">
        <Typography className="s" color={COLOR_NEUTRALS_5}>
          Home
        </Typography>
      </Link>

      {breadcrumbsRoutes.map(({ path, label }, index) => (
        <Link to={path} key={path + label}>
          <Typography
            variant="body1"
            className="s"
            fontWeight={FontWeights.fontWeightSemiBold}
            color={index === breadcrumbsRoutes.length - 1 ? theme.themeColors.colorBreadcrumbsActive : COLOR_NEUTRALS_5}
          >
            {shortenPhrase(label, 10, 6)}
          </Typography>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};
