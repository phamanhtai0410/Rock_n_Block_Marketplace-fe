import { FC } from 'react';
import { Divider, Typography } from '@mui/material';

import { VariantProps, VariantValues } from '../../ExploreNfts.helpers';

export type ExploreTitleProps = {
  variant: VariantProps;
};

export const ExploreTitle: FC<ExploreTitleProps> = ({ variant }) => {
  return (
    <>
      {variant === VariantValues.Explore && (
        <Typography variant="h2" letterSpacing="-0.02em" sx={{ textAlign: 'center', pb: 6 }}>
          NFT Marketplace
        </Typography>
      )}
      {variant === VariantValues.Landing && (
        <Typography variant="h4" letterSpacing="-0.01em" sx={{ pb: 5 }}>
          Explore
        </Typography>
      )}
      {variant === VariantValues.Mixed && (
        <>
          <Typography variant="h2" letterSpacing="-0.02em" sx={{ textAlign: 'center', pb: 6 }}>
            Mixed Collections
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </>
      )}
    </>
  );
};
