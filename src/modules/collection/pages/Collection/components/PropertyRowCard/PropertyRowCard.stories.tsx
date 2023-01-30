import { Stack } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PropertyRowCard } from './PropertyRowCard';
import { propetyRowCardPropsMocked } from './PropertyRowCard.mock';

export default {
  title: 'components/PropertyRowCard',
  component: PropertyRowCard,
} as ComponentMeta<typeof PropertyRowCard>;

const Template: ComponentStory<typeof PropertyRowCard> = (args) => (
  <Stack maxWidth={260} spacing={2} sx={{ border: '1px solid red' }}>
    <PropertyRowCard {...args} />
    <PropertyRowCard {...args} />
    <PropertyRowCard {...args} />
  </Stack>
);
export const Default = Template.bind({});

Default.args = propetyRowCardPropsMocked;
