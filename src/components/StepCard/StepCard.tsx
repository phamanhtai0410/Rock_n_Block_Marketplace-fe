import { FC } from 'react';
import { Box, Stack, StackProps, SvgIconProps, Typography } from '@mui/material';
import { Card } from 'components/Card';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export type StepCardProps = {
  text?: string;
  title: string;
  step: string;
  Icon: FC<SvgIconProps>;
};

export const StepCard: FC<StepCardProps & Pick<StackProps, 'sx'>> = ({ text, title, Icon, step, sx }) => {
  return (
    <Card
      noBorder
      sx={{
        padding: { xs: 2.5, sm: 2.75, md: 3 },
        pb: { xs: 2.5, md: 3, lg: 4 },
        pr: { md: 5 },
        ...sx,
      }}
    >
      <Box
        sx={{
          ...flexHelper('space-between', 'flexStart'),
          position: 'relative',
        }}
      >
        <Typography variant="button" className="pink">
          {step}
        </Typography>
        <Icon
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: { xs: '90px', md: '103px' },
            height: { xs: '90px', md: '96px' },
          }}
        />
      </Box>
      <Stack spacing={3} mt={{ xs: 13.25, sm: 11.25, md: 9.5 }}>
        <Typography variant="body1" className="xl" fontWeight={FontWeights.fontWeightSemiBold}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          className="s"
          sx={(theme) => ({ color: theme.themeColors.colorStepCardText, maxWidth: '357px' })}
        >
          {text}
        </Typography>
      </Stack>
    </Card>
  );
};
