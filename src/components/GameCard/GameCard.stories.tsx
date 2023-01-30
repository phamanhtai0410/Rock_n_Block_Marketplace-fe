import React from 'react';
import { Container } from '@mui/material';
import { GameCard } from 'components/GameCard/GameCard';
import { gameCardPropsMocked } from 'components/GameCard/GameCard.mock';

export default {
  title: 'components/GameCard',
  component: GameCard,
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
    <GameCard {...gameCardPropsMocked} />
    <GameCard {...gameCardPropsMocked} />
    <GameCard {...gameCardPropsMocked} />
    <GameCard {...gameCardPropsMocked} />
  </Container>
);
