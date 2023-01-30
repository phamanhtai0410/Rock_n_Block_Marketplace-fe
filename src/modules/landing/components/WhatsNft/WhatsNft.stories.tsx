import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WhatsNft } from './WhatsNft';

export default {
  title: 'components/WhatsNft',
  component: WhatsNft,
} as ComponentMeta<typeof WhatsNft>;

const Template: ComponentStory<typeof WhatsNft> = () => <WhatsNft />;
export const Default = Template.bind({});
