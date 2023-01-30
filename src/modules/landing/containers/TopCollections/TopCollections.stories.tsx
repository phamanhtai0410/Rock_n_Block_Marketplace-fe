import { Box } from '@mui/material';

import { TopCollections } from './TopCollections';

export default {
  title: 'components/TopCollections',
  component: TopCollections,
};

export const Default = () => (
  <Box>
    <TopCollections topCollectionPeriod={1} />
  </Box>
);
