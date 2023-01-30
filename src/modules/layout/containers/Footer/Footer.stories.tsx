import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Footer } from './Footer';

export default {
  title: 'components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => (
  <Box>
    <Footer {...args} />
  </Box>
);
export const Default = Template.bind({});
