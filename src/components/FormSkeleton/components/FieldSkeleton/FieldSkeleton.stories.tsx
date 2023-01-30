import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FieldSkeleton } from './FieldSkeleton';

export default {
  title: 'components/FieldSkeleton',
  component: FieldSkeleton,
} as ComponentMeta<typeof FieldSkeleton>;

const Template: ComponentStory<typeof FieldSkeleton> = () => (
  <Box sx={{ width: 446, border: '1px solid red' }}>
    <FieldSkeleton />
  </Box>
);
export const Default = Template.bind({});
