import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Banner } from './Banner';

export default {
  title: 'components/Banner',
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = () => <Banner />;
export const Default = Template.bind({});
