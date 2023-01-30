import React from 'react';
import { Container } from '@mui/material';
import { Carousel } from 'components/Carousel';
import { createAndSellHelper } from 'modules/landing/containers/CreateAndSell/CreateAndSell.helper';

import { StepCard } from './StepCard';
import { stepCardMocked } from './StepCard.mock';

export default {
  title: 'components/StepCard',
  component: StepCard,
};

export const Default: React.FC = () => (
  <>
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        border: '1px solid red',
        margin: '16px',
        '& > *': {
          margin: '16px',
          flexBasis: 'calc(25% - 32px)',
        },
      }}
    >
      <Carousel loop sx={{ px: 0 }}>
        {createAndSellHelper.map(({ title, text, Icon, step }) => (
          <StepCard key={title} step={step} title={title} text={text} Icon={Icon} />
        ))}
      </Carousel>
    </Container>
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        border: '1px solid green',
        margin: '16px',
        '& > *': {
          margin: '16px',
          flexBasis: 'calc(50% - 32px)',
        },
      }}
    >
      <StepCard {...stepCardMocked} />
      <StepCard {...stepCardMocked} />
    </Container>
  </>
);
