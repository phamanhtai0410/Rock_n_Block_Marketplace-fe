import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PreviewNft } from './PreviewNft';
import { previewNftPropsMocked } from './PreviewNft.mock';

export default {
  title: 'components/PreviewNft',
  component: PreviewNft,
} as ComponentMeta<typeof PreviewNft>;

const Template: ComponentStory<typeof PreviewNft> = (args) => <PreviewNft {...args} />;
export const Default = Template.bind({});

Default.args = previewNftPropsMocked;
