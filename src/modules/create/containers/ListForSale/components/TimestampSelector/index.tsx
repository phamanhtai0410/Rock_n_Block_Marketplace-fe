import { FC } from 'react';
import { Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';

export type Time = {
  timeStampHours: number;
  timeStampSeconds: number;
};

export type TimestampSelectorProps = {
  timestampOptions: Time[];
  selectedTimestamp: number;
  onTimestampClick: (timestamp: number) => void;
};

export const TimestampSelector: FC<TimestampSelectorProps> = ({
  timestampOptions,
  selectedTimestamp,
  onTimestampClick,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Stack>
      <Typography
        align="center"
        variant="body1"
        sx={{
          fontSize: '12px',
          color: theme.themeColors.colorModalsText,
          fontWeight: FontWeights.fontWeightBold,
          lineHeight: '12px',
          textTransform: 'uppercase',
        }}
      >
        Time
      </Typography>
      <Tabs
        orientation={isSmallScreen ? 'horizontal' : 'vertical'}
        value={selectedTimestamp}
        sx={{ mt: 2 }}
        onChange={(_, value) => onTimestampClick(value)}
        className="outlined"
      >
        {timestampOptions.map(({ timeStampHours, timeStampSeconds }) => {
          return (
            <Tab
              key={timeStampHours}
              value={timeStampSeconds}
              sx={{ maxWidth: '96px', mr: 2, mb: { xs: 2, sm: 0 } }}
              className="sm"
              label={
                <Stack direction="row" spacing={1}>
                  <Typography fontSize="14px" lineHeight="16px" fontWeight={FontWeights.fontWeightBold}>
                    {timeStampHours}
                  </Typography>
                  <Typography
                    fontSize="14px"
                    color={COLOR_NEUTRALS_4}
                    fontWeight={FontWeights.fontWeightBold}
                    lineHeight="16px"
                  >
                    Hour
                  </Typography>
                </Stack>
              }
            />
          );
        })}
      </Tabs>
    </Stack>
  );
};
