import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CreateNftContainer } from './CreateNftContainer';
import { createNftContainerPropsMocked } from './CreateNftContainer.mock';

export default {
  title: 'containers/CreateNftContainer',
  component: CreateNftContainer,
} as ComponentMeta<typeof CreateNftContainer>;

const Template: ComponentStory<typeof CreateNftContainer> = (args) => <CreateNftContainer {...args} />;
export const Default = Template.bind({});

Default.args = createNftContainerPropsMocked;
