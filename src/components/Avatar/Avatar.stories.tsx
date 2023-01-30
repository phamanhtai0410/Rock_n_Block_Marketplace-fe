import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './Avatar';
import { avatarPropsMocked } from './Avatar.mock';

export default {
  title: 'components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;
export const Default = Template.bind({});

Default.args = avatarPropsMocked;
