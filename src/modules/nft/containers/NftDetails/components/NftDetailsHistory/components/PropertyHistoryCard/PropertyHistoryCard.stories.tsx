import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PropertyHistoryCard } from './PropertyHistoryCard';
import { propertyHistoryCardPropsMocked } from './PropertyHistoryCard.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsHistory/components/PropertyHistoryCard',
  component: PropertyHistoryCard,
} as ComponentMeta<typeof PropertyHistoryCard>;

const Template: ComponentStory<typeof PropertyHistoryCard> = (args) => <PropertyHistoryCard {...args} />;
export const Default = Template.bind({});

Default.args = propertyHistoryCardPropsMocked;
