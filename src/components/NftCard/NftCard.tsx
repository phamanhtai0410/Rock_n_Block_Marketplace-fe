import { FC, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, BoxProps, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Amount, Card, CustomImage, LikeButton, PromotionChip, ShareButton } from 'components';
import { Avatar } from 'components/Avatar/Avatar';
import { Countdown } from 'components/Countdown';
import { AuctionIcon } from 'components/Icon/components';
import { noop } from 'lodash';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { TokenFull } from 'types/api/TokenFull';
import { TokenSlim } from 'types/api/TokenSlim';
import { flexHelper } from 'utils';

export interface NftCardProps extends TokenSlim, Partial<Pick<TokenFull, 'bids'>> {
  isFullCard?: boolean;
  onLikeClick?: (isLiked: boolean) => void;
}

export const NftCard: FC<NftCardProps & Omit<BoxProps, 'id'>> = ({
  media,
  likeCount,
  name,
  id,
  currency,
  price,
  isTimedAucSelling,
  isAucSelling,
  endAuction,
  bids,
  isLiked,
  onLikeClick,
  available,
  isFullCard = true,
  creator,
  onPromotion,
  ...boxProps
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleAvatarClick = (event: Event | React.SyntheticEvent) => {
    event.stopPropagation();
    navigate(routes.profile.root.getPath(creator.id || 0));
  };

  const priceBidValue = useMemo(
    () => (isTimedAucSelling ? (0).toFixed(2) : (price ? +price : 0).toFixed(Number.isInteger(price) ? 2 : 18)),
    [isTimedAucSelling, price],
  );

  return (
    <Card
      sx={{
        height: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing(1.5, 2),
        ...boxProps.sx,
      }}
    >
      <Box sx={{ ...flexHelper('space-between'), marginBottom: theme.spacing(1) }}>
        <Avatar
          onClick={handleAvatarClick}
          image={creator.avatar || ''}
          name={creator.name || creator.address}
          noWrap
        />
        <Box sx={{ display: 'flex' }}>
          <ShareButton
            url={`${window.location.host}/nft/${id}`}
            sx={{ marginRight: theme.spacing(0.5), display: 'inline-block' }}
          />
          <LikeButton onClick={onLikeClick || noop} isLiked={Boolean(isLiked)} likeCount={likeCount || 0} />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {onPromotion && <PromotionChip />}

        <CustomImage path={routes.nft.root.getPath(id || 0)} media={media || ''} altImage={name} />
      </Box>
      {isFullCard && (
        <Box
          sx={{
            padding: theme.spacing(2, 0),
            flexGrow: 1,
            '& > *': {
              padding: theme.spacing(0.25, 0),
            },
          }}
        >
          <Box sx={{ ...flexHelper('space-between') }}>
            <Typography
              variant="body1"
              className="s"
              fontWeight="medium"
              component={Link}
              to={routes.nft.root.getPath(id || 0)}
              noWrap
              sx={{
                '&.MuiTypography-root': {
                  color: theme.themeColors.colorNftCardNameText,
                },
              }}
            >
              {name}
            </Typography>
            {price && !isTimedAucSelling && !isAucSelling && (
              <Box
                sx={{
                  display: 'flex',
                  border: theme.themeColors.colorNftCardPriceBorder,
                  padding: theme.spacing(0.75, 1),
                  borderRadius: 2,
                }}
              >
                <Amount.Crypto
                  sx={{
                    fontWeight: FontWeights.fontWeightBold,
                    fontSize: '12px',
                    lineHeight: '12px !important',
                    color: COLOR_PRIMARY_1,
                    whiteSpace: 'nowrap',
                  }}
                  value={priceBidValue}
                  symbol={currency?.symbol}
                />
              </Box>
            )}
          </Box>
          {isTimedAucSelling || isAucSelling ? (
            <Box
              sx={{
                marginTop: theme.spacing(2.75),
                paddingTop: theme.spacing(0.5),
                borderTop: theme.themeColors.colorNftCardIdBidBorder,
                ...flexHelper('space-between'),
                flexWrap: 'wrap',
                jusifyContent: { xs: 'flex-end', sm: 'space-between' },
              }}
            >
              <Box display="flex" alignItems="center">
                <AuctionIcon />
                <Typography
                  className="xs"
                  sx={{
                    '&.MuiTypography-root': {
                      color: theme.themeColors.colorNftCardBidText,
                      marginRight: theme.spacing(0.5),
                      lineHeight: '12px',
                    },
                  }}
                >
                  {bids?.length ? 'Current bid' : 'Minimal bid'}
                </Typography>
                <Typography fontWeight="bold" className="xs pink" lineHeight="12px !important">
                  {price} {currency?.symbol}
                </Typography>
              </Box>
              {isTimedAucSelling && (
                <Countdown auctionEndText="Auction is over" endAuction={Number(endAuction) || 0} isNftCard />
              )}
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: theme.spacing(2.25),
                paddingTop: theme.spacing(1),
                borderTop: theme.themeColors.colorNftCardIdBidBorder,
                ...flexHelper('space-between'),
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  '&.MuiTypography-root': {
                    color: theme.themeColors.colorNftCardIdText,
                  },
                }}
              >
                Id #{id}
              </Typography>
              {!!(available && available > 1) && (
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  sx={{
                    '&.MuiTypography-root': {
                      color: theme.themeColors.colorNftCardInStockText,
                    },
                  }}
                >
                  {available} inStock
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
};
