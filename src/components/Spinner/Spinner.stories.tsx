import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Spinner } from './Spinner';
import { spinnerPropsMocked } from './Spinner.mock';

export default {
  title: 'components/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <>
    <Spinner size="s" />
    <Spinner size="xl" />
  </>
);
export const Default = Template.bind({});

Default.args = spinnerPropsMocked;
