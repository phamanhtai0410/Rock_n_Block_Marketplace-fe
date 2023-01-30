import { ComponentMeta, ComponentStory } from '@storybook/react';

import { QuantityInput } from './QuantityInput';
import { quantityInputPropsMocked } from './QuantityInput.mock';

export default {
  title: 'components/QuantityInput',
  component: QuantityInput,
} as ComponentMeta<typeof QuantityInput>;

const Template: ComponentStory<typeof QuantityInput> = (args) => <QuantityInput {...args} />;
export const Default = Template.bind({});

Default.args = quantityInputPropsMocked;
