import { Container } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FollowingCard } from './FollowingCard';
import { followingCardPropsMocked } from './FollowingCard.mock';

export default {
  title: 'components/FollowingCard',
  component: FollowingCard,
} as ComponentMeta<typeof FollowingCard>;

const Template: ComponentStory<typeof FollowingCard> = () => (
  <Container>
    <FollowingCard {...followingCardPropsMocked} />
  </Container>
);
export const Default = Template.bind({});
