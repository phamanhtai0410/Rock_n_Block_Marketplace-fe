import { Box } from '@mui/material';
import { ComponentMeta } from '@storybook/react';

import { OpenContolMenuButton } from './OpenContolMenuButton';
import { openContolMenuButtonPropsMocked } from './OpenContolMenuButton.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsControlBlock/components/OpenContolMenuButton',
  component: OpenContolMenuButton,
} as ComponentMeta<typeof OpenContolMenuButton>;

export const Default = () => (
  <Box>
    <OpenContolMenuButton {...openContolMenuButtonPropsMocked} />
  </Box>
);
