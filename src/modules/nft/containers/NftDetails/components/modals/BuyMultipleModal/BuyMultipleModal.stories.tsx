import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BuyMultipleModal } from './BuyMultipleModal';
import { buyMultipleModalPropsMocked } from './BuyMultipleModal.mock';

export default {
  title: 'components/nftActionModals/BuyMultileModal',
  component: BuyMultipleModal,
} as ComponentMeta<typeof BuyMultipleModal>;

const Template: ComponentStory<typeof BuyMultipleModal> = (args) => <BuyMultipleModal {...args} />;
export const Default = Template.bind({});

Default.args = buyMultipleModalPropsMocked;
