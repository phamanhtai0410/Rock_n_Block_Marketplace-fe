import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from './Modal';
import { modalPropsMocked } from './Modal.mocked';

export default {
  title: 'components/ProgressBar',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;
export const Default = Template.bind({});

Default.args = modalPropsMocked;
