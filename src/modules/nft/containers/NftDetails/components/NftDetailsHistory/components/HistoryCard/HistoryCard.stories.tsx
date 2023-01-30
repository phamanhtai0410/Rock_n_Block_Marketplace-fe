import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HistoryCard } from './HistoryCard';
import { historyCardPropsMocked } from './HistoryCard.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsHistory/components/HistoryCard',
  component: HistoryCard,
} as ComponentMeta<typeof HistoryCard>;

const Template: ComponentStory<typeof HistoryCard> = (args) => <HistoryCard {...args} />;
export const Default = Template.bind({});

Default.args = historyCardPropsMocked;
