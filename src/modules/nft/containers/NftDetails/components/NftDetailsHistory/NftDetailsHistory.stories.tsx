import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetailsHistory } from './NftDetailsHistory';
import { nftDetailsHistoryPropsMocked } from './NftDetailsHistory.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsHistory',
  component: NftDetailsHistory,
} as ComponentMeta<typeof NftDetailsHistory>;

const Template: ComponentStory<typeof NftDetailsHistory> = (args) => <NftDetailsHistory {...args} />;
export const Default = Template.bind({});

Default.args = nftDetailsHistoryPropsMocked;
