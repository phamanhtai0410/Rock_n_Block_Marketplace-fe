/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { useTimeLeft } from 'hooks';
import { flexHelper, getFormattedCounterDate } from 'utils';

export interface CountdownProps {
  endAuction: number;
  auctionEndText: string;
  isNftCard?: boolean;
  className?: string;
}

export const Countdown: FC<CountdownProps> = ({ endAuction, auctionEndText, isNftCard = false, className }) => {
  const timeLeft = useTimeLeft(endAuction * 1000);

  if (!timeLeft) {
    return <span>{auctionEndText}</span>;
  }

  const { hours, minutes, seconds } = timeLeft;

  if (isNftCard) {
    return (
      <Typography
        variant="body1"
        className={clsx(className, 'xs')}
        fontWeight="bold"
        sx={(theme) => ({
          '&.MuiTypography-root': {
            color: theme.themeColors.colorCountdownText,
          },
        })}
      >
        <span>{getFormattedCounterDate(+hours)}:</span>
        <span>{getFormattedCounterDate(+minutes)}:</span>
        <span>{getFormattedCounterDate(+seconds)}</span>
      </Typography>
    );
  }

  return (
    <Box
      className={className}
      sx={(theme) => ({
        ...flexHelper('flex-start'),
        gap: theme.spacing(1.5),
        '&.MuiTypography-root': {
          color: theme.themeColors.colorCountdownText,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          ...flexHelper(),
          flexDirection: 'column',
          padding: theme.spacing(1, 0),
          width: '94px',
          borderRadius: '7px',
        })}
      >
        <Typography variant="h4" className="bold">
          {hours}
        </Typography>
        <Typography variant="body1" className="caption">
          Hours
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          ...flexHelper(),
          flexDirection: 'column',
          padding: theme.spacing(1, 0),
          width: '94px',
          borderRadius: '7px',
        })}
      >
        <Typography variant="h4" className="bold">
          {minutes}
        </Typography>
        <Typography variant="body1" className="caption">
          Minutes
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          ...flexHelper(),
          flexDirection: 'column',
          padding: theme.spacing(1, 0),
          width: '94px',
          borderRadius: '7px',
        })}
      >
        <Typography variant="h4" className="bold">
          {seconds}
        </Typography>
        <Typography variant="body1" className="caption">
          Seconds
        </Typography>
      </Box>
    </Box>
  );
};
