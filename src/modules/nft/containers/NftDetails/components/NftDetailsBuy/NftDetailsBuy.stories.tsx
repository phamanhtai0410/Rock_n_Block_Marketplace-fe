import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetailsBuy } from './NftDetailsBuy';
import { nftDetailsBuyPropsMocked } from './NftDetailsBuy.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsBuy',
  component: NftDetailsBuy,
} as ComponentMeta<typeof NftDetailsBuy>;

const Template: ComponentStory<typeof NftDetailsBuy> = (args) => <NftDetailsBuy {...args} />;
export const Default = Template.bind({});

Default.args = nftDetailsBuyPropsMocked;
