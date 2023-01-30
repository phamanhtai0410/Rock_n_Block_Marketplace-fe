import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetailsInfoBlock } from './NftDetailsInfoBlock';
import { nftDetailsInfoBlockPropsMocked } from './NftDetailsInfoBlock.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsInfoBlock',
  component: NftDetailsInfoBlock,
} as ComponentMeta<typeof NftDetailsInfoBlock>;

const Template: ComponentStory<typeof NftDetailsInfoBlock> = (args) => <NftDetailsInfoBlock {...args} />;
export const Default = Template.bind({});

Default.args = nftDetailsInfoBlockPropsMocked;
