import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Copy } from './Copy';
import { copyPropsMocked } from './Copy.mocked';

export default {
  title: 'components/Copy',
  component: Copy,
} as ComponentMeta<typeof Copy>;

const Template: ComponentStory<typeof Copy> = (args) => <Copy {...args}>{copyPropsMocked.copyText}</Copy>;
export const Default = Template.bind({});

Default.args = copyPropsMocked;
