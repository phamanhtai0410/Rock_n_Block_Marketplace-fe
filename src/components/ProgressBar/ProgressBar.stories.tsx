import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProgressBar } from './ProgressBar';
import { progressBarPropsMocked } from './ProgressBar.mock';

export default {
  title: 'components/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;
export const Default = Template.bind({});

Default.args = progressBarPropsMocked;
