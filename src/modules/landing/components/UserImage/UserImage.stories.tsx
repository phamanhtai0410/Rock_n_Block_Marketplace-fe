import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UserImage } from './UserImage';
import { userImagePropsMocked } from './UserImage.mock';

export default {
  title: 'components/UserImage',
  component: UserImage,
} as ComponentMeta<typeof UserImage>;

const Template: ComponentStory<typeof UserImage> = (args) => <UserImage {...args} />;
export const Default = Template.bind({});

Default.args = userImagePropsMocked;
