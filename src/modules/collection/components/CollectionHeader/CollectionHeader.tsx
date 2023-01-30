import { FC } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { mockAva } from 'assets/images';
import { Avatar, Socials } from 'components';
import { BlueCheck, Edit } from 'components/Icon/components';
import { useShallowSelector } from 'hooks';
import { chains } from 'services/WalletService/config';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_4, COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Chains, ICollection } from 'types';
import { shortenPhrase } from 'utils';
import { smartRound } from 'utils/accurateToFixed';

type CollectionHeaderProps = {
  collection: ICollection;
  id: string;
};

export const CollectionHeader: FC<CollectionHeaderProps> = ({ collection, id }) => {
  const theme = useTheme();
  const userId = useShallowSelector(userSelector.getProp('user'));
  const navigate = useNavigate();
  const isAbleToEdit = Number(collection?.creator?.id) === Number(userId.id);

  const handleEditClick = () => {
    navigate(routes.edit.root.getPath(+id));
  };

  const isUpToMedium = useMediaQuery('(max-width:830px)');

  const { site, twitter, instagram, discord, telegram, medium } = collection;
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'start' }}
      spacing={4}
      sx={{ marginBottom: 4 }}
    >
      <Avatar image={collection?.avatar || mockAva} size="xxl" />

      <Stack sx={{ alignItems: { xs: 'center', sm: 'start' } }}>
        <Typography
          variant="h4"
          lineHeight="35px"
          sx={{ position: 'relative', maxWidth: '440px', marginBottom: 1, textAlign: { xs: 'center', sm: 'start' } }}
        >
          {collection.name}
          {collection.isVerified && (
            <BlueCheck sx={{ position: 'absolute', bottom: '4px', verticalAlign: 'middle', marginLeft: 0.5 }} />
          )}
        </Typography>

        <Typography variant="body1" className="s" fontWeight={FontWeights.fontWeightSemiBold} sx={{ mb: 1 }}>
          <Box component="span" sx={{ color: COLOR_NEUTRALS_4 }}>
            {collection.isImported ? 'Added by' : 'Created by'}
          </Box>
          <RouteLink to={routes.profile.root.getPath(+(collection?.creator?.id || 0))}>
            <Box component="span" sx={{ color: COLOR_PRIMARY_1, ml: 1 }}>
              {collection.creator.displayName ||
                (collection.creator.address && shortenPhrase(collection.creator.address, 6, 4))}
            </Box>
          </RouteLink>
        </Typography>
        <Typography
          variant="body1"
          className="s"
          fontWeight={FontWeights.fontWeightSemiBold}
          sx={{
            backgroundColor: theme.themeColors.colorCollectionSubtitleBackground,
            borderRadius: '8px',
            padding: theme.spacing(1.25, 2, 1.25, 1),
            mb: 2,
          }}
        >
          <Box component="span" sx={{ color: COLOR_NEUTRALS_4, span: { color: COLOR_PRIMARY_1 } }}>
            Items {collection?.tokensCount}, Floor price:{' '}
            {collection?.floorPrice && collection?.currency?.rate
              ? smartRound(Number(collection.floorPrice) * Number(collection.currency.rate))
              : '0'}{' '}
            <Box component="span">USD</Box>
          </Box>
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            span: {
              color: theme.themeColors.colorTextBody2,
              marginRight: 1,
            },
            mb: 2,
          }}
        >
          <span>Blockchain: </span>
          <Box
            component="img"
            src={chains[collection.network?.name as Chains].mainnet.img}
            sx={{ width: 20, height: 20, marginRight: 1 }}
          />
          {collection.network?.name}
        </Typography>
        <Typography
          sx={{
            span: {
              color: theme.themeColors.colorTextBody2,
            },
            mb: 2,
          }}
        >
          <span>Creator earnings: </span>
          {collection.creatorRoyalty}%
        </Typography>
        <Typography
          sx={{
            span: {
              color: theme.themeColors.colorTextBody2,
            },
            mb: 2,
          }}
        >
          <span>Trading volume: </span>${collection.volumeTraded} / {collection.volumeTradedCrypto}{' '}
          {collection.network.nativeSymbol}
        </Typography>
        <Socials {...{ site, twitter, instagram, discord, telegram, medium }} />
        {isAbleToEdit && (
          <Box sx={{ display: { xs: 'block', sm: 'none' }, mb: 4 }}>
            <Button onClick={handleEditClick} variant="outlined" size="small" endIcon={<Edit />}>
              Edit collection
            </Button>
          </Box>
        )}

        <Typography className="s" sx={{ maxWidth: 525, width: '100%', wordBreak: 'break-word' }}>
          {collection.description}
        </Typography>
      </Stack>
      {isAbleToEdit && (
        <Box sx={{ marginLeft: 'auto !important', minWidth: '160px', display: { xs: 'none', sm: 'block' } }}>
          <Button
            onClick={handleEditClick}
            variant="outlined"
            size="small"
            sx={{ ...(isUpToMedium && { span: { margin: 0 } }) }}
            endIcon={<Edit />}
          >
            {!isUpToMedium && 'Edit collection'}
          </Button>
        </Box>
      )}
    </Stack>
  );
};
