/* eslint-disable react/no-array-index-key */
import { FC, useState } from 'react';
import { Box, BoxProps, Button, useTheme } from '@mui/material';
import { Card } from 'components';
import { COLOR_NEUTRALS_2, COLOR_NEUTRALS_3 } from 'theme/colors';
import { Ownership } from 'types/api/Ownership';

import { SetBuyMultipleModalCallback } from '../../NftDetails.types';

import { HistoryCard, HistoryCardProps, OwnerHistoryCard } from './components';
import { NftDetailsHistoryTabs } from './NftDetailsHistory.helper';

export interface NftDetailsHistoryProps {
  owners?: Ownership[];
  history: HistoryCardProps[];
  onBuyClick?: SetBuyMultipleModalCallback;
  userAddress: string;
  isMultiple?: boolean;
}

export const NftDetailsHistory: FC<NftDetailsHistoryProps & BoxProps> = ({
  owners,
  history,
  onBuyClick,
  userAddress,
  isMultiple,
  ...boxProps
}) => {
  const theme = useTheme();
  const [activeTab, setactiveTab] = useState(NftDetailsHistoryTabs.owners);
  return (
    <Box {...boxProps}>
      <Box
        sx={{
          p: 0.75,
          border: `2px solid ${theme.themeColors.colorNftDetailsHistoryTabsBorder}`,
          borderRadius: '36px',
          mb: 2.5,
        }}
      >
        {Object.entries(NftDetailsHistoryTabs).map(([key, value]) => {
          return (
            <Button
              sx={{
                minWidth: { xs: 0, sm: 100, md: 100 },
                fontSize: { xs: '14px' },
                padding: { xs: theme.spacing(1) },
                height: 28,
                color: theme.themeColors.colorNftDetailsHistoryTabNotActiveText,
                background: 'transparent',
                ...(value === activeTab && {
                  background: COLOR_NEUTRALS_3,
                  color: theme.themeColors.colorNftDetailsHistoryTabActiveText,
                }),
                '&:hover': {
                  background: COLOR_NEUTRALS_2,
                },
                '&:not(:last-child)': {
                  mr: 1,
                },
              }}
              variant="text"
              key={key}
              onClick={() => setactiveTab(value)}
            >
              {value}
            </Button>
          );
        })}
      </Box>
      <Card
        noBorder
        sx={{
          overflow: 'auto',
          padding: 2,
          maxHeight: 420,
          '& > *': {
            padding: theme.spacing(2, 0),
            borderBottom: `1px solid ${theme.themeColors.colorDivider}`,
            '&:first-of-type': {
              padding: theme.spacing(0, 0, 2, 0),
            },
          },
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {activeTab === NftDetailsHistoryTabs.history &&
          history.map((props, index) => <HistoryCard key={index} {...props} />)}
        {activeTab === NftDetailsHistoryTabs.owners &&
          (owners || []).map((props, index) => (
            <OwnerHistoryCard
              key={index}
              {...props}
              onBuyClick={onBuyClick}
              userAddress={userAddress}
              shouldShowButton={isMultiple}
            />
          ))}
      </Card>
    </Box>
  );
};
