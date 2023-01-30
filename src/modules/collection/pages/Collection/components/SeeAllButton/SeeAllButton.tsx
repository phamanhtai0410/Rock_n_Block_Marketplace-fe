import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { routes } from 'appConstants';
import { Eye } from 'components/Icon/components';
import { shortenPhrase } from 'utils';

export type SeeAllButtonProps = {
  collectionUrl?: string;
  subcategoryName?: string | null;
};

export const SeeAllButton: FC<SeeAllButtonProps> = ({ subcategoryName, collectionUrl }) => {
  return (
    <Box>
      {subcategoryName && (
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={routes.mixedCollections.root.getPath(collectionUrl)}
          endIcon={<Eye />}
          sx={{
            display: 'flex',
            alignSelf: 'flex-start',
            textTransform: 'capitalize',
            fontSize: '14px',
            mb: 3,
            px: 2.25,
          }}
        >
          See all from {shortenPhrase(subcategoryName || '', 4, 2)}
        </Button>
      )}
    </Box>
  );
};
