import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PricingCard } from './PricingCard';
import { mockProps } from './PricingCard.mock';

export default {
  title: 'components/PricingCard',
  component: PricingCard,
} as ComponentMeta<typeof PricingCard>;

const Template: ComponentStory<typeof PricingCard> = () => <PricingCard {...mockProps} />;
export const Default = Template.bind({});
