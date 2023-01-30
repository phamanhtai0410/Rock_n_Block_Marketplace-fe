import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetailsDescription } from './NftDetailsDescription';
import { nftDetailsDescriptionPropsMocked } from './NftDetailsDescription.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsDescription',
  component: NftDetailsDescription,
} as ComponentMeta<typeof NftDetailsDescription>;

const Template: ComponentStory<typeof NftDetailsDescription> = (args) => <NftDetailsDescription {...args} />;
export const Default = Template.bind({});

Default.args = nftDetailsDescriptionPropsMocked;
