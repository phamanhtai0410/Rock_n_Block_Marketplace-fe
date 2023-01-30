import { Box } from '@mui/material';
import { ComponentMeta } from '@storybook/react';

import { ShareButton } from './ShareButton';
import { shareButtonPropsMocked } from './ShareButton.mock';

export default {
  title: 'components/ShareButton',
  component: ShareButton,
} as ComponentMeta<typeof ShareButton>;

export const Default = () => (
  <Box>
    <ShareButton {...shareButtonPropsMocked} />
  </Box>
);
