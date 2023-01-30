import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Advantages } from './Advantages';

export default {
  title: 'components/Advantages',
  component: Advantages,
} as ComponentMeta<typeof Advantages>;

const Template: ComponentStory<typeof Advantages> = () => <Advantages />;
export const Default = Template.bind({});
