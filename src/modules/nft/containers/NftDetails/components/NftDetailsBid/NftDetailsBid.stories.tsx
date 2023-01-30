import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetailsBid } from './NftDetailsBid';
import { nftDetailsBidPropsMocked } from './NftDetailsBid.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsBid',
  component: NftDetailsBid,
} as ComponentMeta<typeof NftDetailsBid>;

const Template: ComponentStory<typeof NftDetailsBid> = (args) => <NftDetailsBid {...args} />;
export const Default = Template.bind({});

Default.args = nftDetailsBidPropsMocked;
