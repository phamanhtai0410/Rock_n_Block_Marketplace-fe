import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SocialsSkeletons } from './SocialsSkeletons';

export default {
  title: 'components/SocialsSkeletons',
  component: SocialsSkeletons,
} as ComponentMeta<typeof SocialsSkeletons>;

const Template: ComponentStory<typeof SocialsSkeletons> = () => (
  <Box sx={{ width: 446, border: '1px solid red' }}>
    <SocialsSkeletons />
  </Box>
);
export const Default = Template.bind({});
