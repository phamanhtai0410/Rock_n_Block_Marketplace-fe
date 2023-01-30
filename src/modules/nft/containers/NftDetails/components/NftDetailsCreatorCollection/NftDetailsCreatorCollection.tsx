import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Avatar, Card } from 'components';
import { BlueCheck } from 'components/Icon/components';
import { flexHelper } from 'utils';
import { shortenName } from 'utils/shortenName';

export interface NftDetailsCreatorCollectionProps {
  type: 'creator' | 'collection' | 'game';
  name: string;
  avatar: string;
  id: string;
}

export interface NftDetailsCollectionProps extends NftDetailsCreatorCollectionProps {
  isVerified?: boolean;
}

export const textType = {
  collection: 'Collection',
  creator: 'Created by',
  game: 'Game',
};

export const NftDetailsCreatorCollection: FC<NftDetailsCollectionProps> = ({ type, name, avatar, id, isVerified }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        ...flexHelper('flex-start'),
        padding: 1.5,
        minHeight: 48,
        height: '100%',
      }}
      noBorder
    >
      <Link
        to={
          type === 'game'
            ? routes.games.game.root.getPath(name, id)
            : routes[type === 'creator' ? 'profile' : 'collections'].root.getPath(id)
        }
      >
        <Avatar size="semiMedium" image={avatar} />
      </Link>
      <Box ml={1} sx={{ minWidth: 0 }}>
        <Typography
          className="xs"
          sx={{
            color: theme.themeColors.colorNftDetailsCreatorCollectionTitle,
          }}
        >
          {textType[type]}
        </Typography>
        <Stack spacing={0.75} direction="row" alignItems="center">
          <Typography noWrap className="s">
            {shortenName(name)}
          </Typography>
          {type === 'collection' && isVerified && <BlueCheck sx={{ width: 15, height: 15 }} />}
        </Stack>
      </Box>
    </Card>
  );
};
