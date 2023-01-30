import { Container } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CollectionContainer } from './CollectionContainer';
import { CollectionContainerPropsMocked } from './CollectionContainer.mock';

export default {
  title: 'containers/CollectionContainer',
  component: CollectionContainer,
} as ComponentMeta<typeof CollectionContainer>;

const Template: ComponentStory<typeof CollectionContainer> = (args) => (
  <Container>
    <CollectionContainer {...args} isForEdit={false} />
    <CollectionContainer {...args} isForEdit />
  </Container>
);
export const Default = Template.bind({});

Default.args = CollectionContainerPropsMocked;
