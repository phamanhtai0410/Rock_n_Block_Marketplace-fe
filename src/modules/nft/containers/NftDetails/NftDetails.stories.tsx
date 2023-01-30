import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetails } from './NftDetails';

export default {
  title: 'containers/NftDetails',
  component: NftDetails,
} as ComponentMeta<typeof NftDetails>;

const Template: ComponentStory<typeof NftDetails> = () => <NftDetails />;
export const Default = Template.bind({});
