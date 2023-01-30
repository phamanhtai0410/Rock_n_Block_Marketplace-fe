import React from 'react';
import { Container } from '@mui/material';

import { DesignationCard } from './DesignationCard';
import { designationCardMocked } from './DesignationCard.mock';

export default {
  title: 'components/DesignationCard',
  component: DesignationCard,
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
      <DesignationCard {...designationCardMocked} />
      <DesignationCard {...designationCardMocked} />
      <DesignationCard {...designationCardMocked} />
      <DesignationCard {...designationCardMocked} />
      <DesignationCard {...designationCardMocked} />
    </Container>
    <DesignationCard {...designationCardMocked} />
  </>
);
