import { ComponentMeta, ComponentStory } from '@storybook/react';

import { OwnerHistoryCard } from './OwnerHistoryCard';
import { ownerHistoryCardPropsMocked } from './OwnerHistoryCard.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsHistory/components/OwnerHistoryCard',
  component: OwnerHistoryCard,
} as ComponentMeta<typeof OwnerHistoryCard>;

const Template: ComponentStory<typeof OwnerHistoryCard> = (args) => <OwnerHistoryCard {...args} />;
export const Default = Template.bind({});

Default.args = ownerHistoryCardPropsMocked;
