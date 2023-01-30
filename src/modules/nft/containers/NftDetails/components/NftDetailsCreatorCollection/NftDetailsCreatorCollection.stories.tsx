import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NftDetailsCreatorCollection } from './NftDetailsCreatorCollection';
import { nftDetailsCreatorCollectionPropsMocked } from './NftDetailsCreatorCollection.mock';

export default {
  title: 'containers/NftDetails/components/NftDetailsCreatorCollection',
  component: NftDetailsCreatorCollection,
} as ComponentMeta<typeof NftDetailsCreatorCollection>;

const Template: ComponentStory<typeof NftDetailsCreatorCollection> = (args) => (
  <NftDetailsCreatorCollection {...args} />
);
export const Default = Template.bind({});

Default.args = nftDetailsCreatorCollectionPropsMocked;
