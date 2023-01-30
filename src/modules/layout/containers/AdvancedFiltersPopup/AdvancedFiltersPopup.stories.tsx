import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AdvancedFiltersPopup } from './AdvancedFiltersPopup';
import { advancedFiltersPopupPropsMocked } from './AdvancedFiltersPopup.mock';

export default {
  title: 'components/AdvancedFiltersPopup',
  component: AdvancedFiltersPopup,
} as ComponentMeta<typeof AdvancedFiltersPopup>;

const Template: ComponentStory<typeof AdvancedFiltersPopup> = (args) => <AdvancedFiltersPopup {...args} />;
export const Default = Template.bind({});

Default.args = advancedFiltersPopupPropsMocked;
