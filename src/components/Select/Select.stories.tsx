import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Select } from './Select';
import { selectPropsMocked } from './Select.mock';

export default {
  title: 'components/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;
export const Default = Template.bind({});

Default.args = selectPropsMocked;
