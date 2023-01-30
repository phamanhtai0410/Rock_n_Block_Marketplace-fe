import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GridContainer } from 'components/GridContainer';

import { PropertyCard } from './PropertyCard';
import { propertyCardMock } from './PropertyCard.mock';

export default {
  title: 'containers/PropertyCard/components/PropertyCard',
  component: PropertyCard,
} as ComponentMeta<typeof PropertyCard>;

const Template: ComponentStory<typeof PropertyCard> = (args) => (
  <Box sx={{ maxWidth: '446px', border: '1px solid red' }}>
    <GridContainer columns={2}>
      <PropertyCard {...args} />
      <PropertyCard {...args} />
      <PropertyCard {...args} />
    </GridContainer>
  </Box>
);
export const Default = Template.bind({});

Default.args = propertyCardMock;
