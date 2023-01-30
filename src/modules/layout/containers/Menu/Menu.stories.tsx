import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Menu } from './Menu';
import { menuPropsMocked } from './Menu.mock';

export default {
  title: 'components/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;
export const Default = Template.bind({});

Default.args = menuPropsMocked;
