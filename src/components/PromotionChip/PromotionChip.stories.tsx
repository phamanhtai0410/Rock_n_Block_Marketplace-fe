import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PromotionChip } from './PromotionChip';

export default {
  title: 'components/PromotionChip',
  component: PromotionChip,
} as ComponentMeta<typeof PromotionChip>;

const Template: ComponentStory<typeof PromotionChip> = () => <PromotionChip />;
export const Default = Template.bind({});
