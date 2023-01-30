import React from 'react';
import { Box, Typography } from '@mui/material';

import { CustomCardMedia, Proportions } from '.';

export default {
  title: 'components/CustomCardMedia',
  component: CustomCardMedia,
};

const nft = {
  name: 'Nft name',
  image: 'https://i.ytimg.com/vi/c1CvhTWQQaw/maxresdefault.jpg',
};

const nfttWithBrokenLink = {
  name: 'Nft name broken',
  image: 'https://i.ytimg.com/vi/c1CvhTWQQaw/maxresdefadsdsdsult.jpg',
};

export const ProductImagesWithDifferentProportions: React.FC = () => {
  const { image, name } = nft;
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={(theme) => ({
          '&+&': {
            marginLeft: theme.spacing(2),
          },
        })}
      >
        <CustomCardMedia src={image} proportions={Proportions.p3to4} width={320} alt={name} />
        <Typography>3:4</Typography>
      </Box>
      <Box
        sx={(theme) => ({
          '&+&': {
            marginLeft: theme.spacing(1),
          },
        })}
      >
        <CustomCardMedia src={image} proportions={Proportions.p1to1} width={320} alt={name} />
        <Typography>1:1</Typography>
      </Box>
      <Box
        sx={(theme) => ({
          '&+&': {
            marginLeft: theme.spacing(1),
          },
        })}
      >
        <CustomCardMedia src={image} proportions={Proportions.p4to3} width={320} alt={name} />
        <Typography>4:3</Typography>
      </Box>
    </Box>
  );
};

export const ProductImageWithBrokenLink: React.FC = () => {
  const { image, name } = nfttWithBrokenLink;
  return <CustomCardMedia src={image} proportions={Proportions.p4to3} width={320} alt={name} />;
};
