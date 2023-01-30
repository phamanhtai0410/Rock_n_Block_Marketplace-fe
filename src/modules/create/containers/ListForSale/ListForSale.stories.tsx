import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListForSale } from './ListForSale';
import { listForSalePropsMocked } from './ListForSale.mock';

export default {
  title: 'components/Listing',
  component: ListForSale,
} as ComponentMeta<typeof ListForSale>;

const Template: ComponentStory<typeof ListForSale> = (args) => (
  <Box sx={{ maxWidth: '684px' }}>
    <ListForSale {...listForSalePropsMocked} />
  </Box>
);

export const Default = Template.bind({});

Default.args = listForSalePropsMocked;
