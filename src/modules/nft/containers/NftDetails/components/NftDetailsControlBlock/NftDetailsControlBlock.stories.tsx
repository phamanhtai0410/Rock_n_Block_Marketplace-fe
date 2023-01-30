import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetailsControlBlock } from './NftDetailsControlBlock';
import { nftDetailsControlBlockPropsMocked } from './NftDetailsControlBlock.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsControlBlock',
  component: NftDetailsControlBlock,
} as ComponentMeta<typeof NftDetailsControlBlock>;

const Template: ComponentStory<typeof NftDetailsControlBlock> = (args) => <NftDetailsControlBlock {...args} />;
export const Default = Template.bind({});

Default.args = nftDetailsControlBlockPropsMocked;
