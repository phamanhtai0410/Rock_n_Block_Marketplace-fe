import React from 'react';
import { Box } from '@mui/material';

import { TopCollectionCardSkeleton } from './components/TopCollectionCardSkeleton';
import { TopCollectionCard } from './TopCollectionCard';
import { topCollectionCardMock } from './TopCollectionCard.mock';

export default {
  title: 'components/TopCollectionCard',
  component: TopCollectionCard,
};

export const Default: React.FC = () => (
  <>
    <Box style={{ maxWidth: 351 }}>
      <TopCollectionCard {...topCollectionCardMock} />
    </Box>
    <Box style={{ maxWidth: 311, marginTop: 10 }}>
      <TopCollectionCard {...topCollectionCardMock} />
    </Box>
    <Box style={{ maxWidth: 311, marginTop: 10 }}>
      <TopCollectionCardSkeleton />
    </Box>
  </>
);
