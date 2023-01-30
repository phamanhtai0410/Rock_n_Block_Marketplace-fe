import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InfoFieldsSkeleton } from './InfoFieldsSkeleton';

export default {
  title: 'components/InfoFieldsSkeleton',
  component: InfoFieldsSkeleton,
} as ComponentMeta<typeof InfoFieldsSkeleton>;

const Template: ComponentStory<typeof InfoFieldsSkeleton> = () => (
  <Box sx={{ width: 446, border: '1px solid red' }}>
    <InfoFieldsSkeleton />
  </Box>
);
export const Default = Template.bind({});
