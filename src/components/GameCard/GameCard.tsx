import { FC, useMemo } from 'react';
import { Box, Stack, SxProps, Theme, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { defaultBackgroundImage } from 'assets/images';
import { CustomImage } from 'components';
import { Card } from 'components/Card';
import { Proportions } from 'components/CustomCardMedia';
import { currentChains } from 'services/WalletService/config';
import { FontWeights } from 'theme/Typography';
import { GameCompanyList } from 'types/api/GameCompanyList';
import { flexHelper, maxRowsToEllipsis } from 'utils';

const LINES_TO_SHOW = '3';

export const GameCard: FC<GameCompanyList & { sx?: SxProps<Theme> }> = ({ avatar, name, network, description, sx }) => {
  const currentChain = useMemo(() => currentChains.find((chain) => chain.id === network?.name), [network]);
  return (
    <Card sx={{ padding: 1.5, pb: 3, height: '100%', ...sx }} noBorder>
      <CustomImage
        path={routes.games.game.root.getPath(name || '', String(network?.name))}
        customCardMediaSx={{ aspectRatio: `${Proportions.p16to9}` }}
        media={avatar || defaultBackgroundImage}
        altImage={name}
        sx={{
          img: {
            borderRadius: 2,
          },
        }}
      />
      <Stack spacing={1} mt={1.25}>
        <Stack direction="row" spacing={1.5} sx={{ ...flexHelper('space-between', 'flex-start') }}>
          <Typography
            fontWeight={FontWeights.fontWeightMedium}
            textTransform="capitalize"
            sx={{ maxWith: '90%', wordBreak: 'break-all' }}
          >
            {name}
          </Typography>
          <Box component="img" src={currentChain?.img} sx={{ width: 24, height: 24 }} />
        </Stack>

        <Typography className="s" sx={{ ...maxRowsToEllipsis(LINES_TO_SHOW), minHeight: 74 }}>
          {description}
        </Typography>
      </Stack>
    </Card>
  );
};
