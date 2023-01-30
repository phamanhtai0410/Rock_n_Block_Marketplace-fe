import React from 'react';
import { Container } from '@mui/material';
import { CategoryCard } from 'modules/games/components';
import { categoryCardMock } from 'modules/games/components/CategoryCard/CategoryCard.mock';

export default {
  title: 'components/CategoryCard',
  component: CategoryCard,
};

export const Default: React.FC = () => (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      border: '1px solid red',
      margin: '16px',
      '& > *': {
        margin: '16px',
        flexBasis: 'calc(50% - 32px)',
      },
    }}
  >
    <CategoryCard {...categoryCardMock} />
    <CategoryCard {...categoryCardMock} />
    <CategoryCard {...categoryCardMock} />
  </Container>
);
