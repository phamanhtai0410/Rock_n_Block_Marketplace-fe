import { FC } from 'react';
import { Box, Stack, StackProps, SvgIconProps, Typography, useTheme } from '@mui/material';
import { COLOR_GRADIENT_ACCENT, COLOR_NEUTRALS_5, COLOR_WHITE } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { BORDER_RADIUS_DEFAULT, BOX_SHADOW_MAIN } from 'theme/variables';
import { flexHelper } from 'utils';

export type DesignationCardProps = {
  text?: string;
  title: string;
  Icon: FC<SvgIconProps>;
};

export const DesignationCard: FC<DesignationCardProps & Pick<StackProps, 'sx'>> = ({ text, title, Icon, sx }) => {
  const theme = useTheme();
  return (
    <Stack
      spacing={2.25}
      alignItems="flex-start"
      justifyContent="space-between"
      sx={{
        width: { sm: '100%' },
        padding: theme.spacing(3.5, 3, 4.25, 3.25),
        border: theme.themeColors.colorAdvantageCardBorderDefault,
        borderRadius: BORDER_RADIUS_DEFAULT,
        background: theme.themeColors.colorAdvantageCardBackgroundDefault,
        boxShadow: theme.themeColors.boxShadowAdvantageCard,
        ...sx,
      }}
    >
      <Box
        sx={{
          ...flexHelper(),
          width: '51px',
          minHeight: '51px',
          borderRadius: '50%',
          background: COLOR_GRADIENT_ACCENT,
          boxShadow: BOX_SHADOW_MAIN,
        }}
      >
        <Icon sx={{ path: { fill: COLOR_WHITE } }} />
      </Box>
      <Stack>
        <Typography
          variant="body1"
          className="xl"
          color={theme.themeColors.colorAdvantageCardTitle}
          fontWeight={FontWeights.fontWeightSemiBold}
        >
          {title}
        </Typography>
        {text && (
          <Typography
            variant="body1"
            fontWeight={FontWeights.fontWeightMedium}
            fontSize="13px"
            color={COLOR_NEUTRALS_5}
          >
            {text}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
