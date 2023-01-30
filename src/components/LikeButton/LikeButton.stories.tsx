import { Box } from '@mui/material';
import { ComponentMeta } from '@storybook/react';

import { LikeButtonSkeleton } from './components/LikeButtonSkeleton';
import { LikeButton } from './LikeButton';
import { likeButtonPropsMocked } from './LikeButton.mock';

export default {
  title: 'components/LikeButton',
  component: LikeButton,
} as ComponentMeta<typeof LikeButton>;

export const Default = () => (
  <Box>
    <LikeButton {...likeButtonPropsMocked} />
    <Box>
      <LikeButtonSkeleton />
    </Box>
  </Box>
);
