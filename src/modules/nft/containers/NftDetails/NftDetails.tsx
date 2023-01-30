import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Carousel, PromotionChip } from 'components';
import { NftCard } from 'components/NftCard';
import { NftPreview } from 'components/NftPreview';
import { useShallowSelector, useSmoothTopScroll } from 'hooks';
import { Rates } from 'modules/create/containers';
import { ConnectWalletModal } from 'modules/layout/containers';
import { useWalletConnectorContext } from 'services';
import {
  bid,
  burn,
  buy,
  endAuction as endAuctionAction,
  getNftData,
  getRelatedTokens,
  like,
  removeFromSale,
  setOnAuction,
  setOnSale,
  transfer,
} from 'store/nft/actions';
import nftActionTypes from 'store/nft/actionTypes';
import nftSelectors from 'store/nft/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { Chains, RequestStatus, WalletProviders } from 'types';
import { Standard } from 'types/api/enums';
import { Ownership } from 'types/api/Ownership';
import { checksumAddress } from 'utils';

import { AcceptBidModal, BidModal, BuyMultipleModal } from './components/modals';
import { NftDetailsControlBlock } from './components/NftDetailsControlBlock';
import { ControlsSkeleton, DataSkeleton, ImageSkeleton, NftDetailsInfoBlock, NftDetailsProperties } from './components';
import { convertApiHistoryData } from './NftDetails.helper';
import { ListForSaleCallback } from './NftDetails.types';

export const NftDetails = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { nft, ownedTokenAmount, relatedTokens } = useShallowSelector(nftSelectors.getNft);

  const {
    tokenData,
    address: userAddress,
    serviceFee,
    chain,
    provider,
    network: userNetwork,
  } = useShallowSelector(userSelector.getUser);

  const {
    available,
    name,
    id,
    description,
    price,
    currency,
    usdPrice,
    creator,
    collection,
    owners,
    history,
    isLiked,
    likeCount,
    isSelling,
    isAucSelling,
    isTimedAucSelling,
    standard,
    sellers,
    animation,
    media,
    properties,
    format,
    highestBid,
    endAuction,
    promotionInfo,
    onPromotion,
    network,
    game,
  } = nft ?? {};
  const { id: nftId } = useParams();

  const navigate = useNavigate();

  const { [nftActionTypes.GET_NFT_DATA]: getNftDataRequestStatus } = useShallowSelector(uiSelector.getUI);

  const { walletService, connect } = useWalletConnectorContext();

  const [buyMultipleSellersState, setBuyMultipleSellersState] = useState<Ownership[]>([]);

  const currentBidTokenData = useMemo(
    () => tokenData.find(({ symbol }) => symbol === currency?.symbol),
    [currency?.symbol, tokenData],
  );

  const [openModal, setOpenModal] = useState<'init' | 'buy' | 'bid' | 'acceptBid' | 'connect'>('init');

  const isErc1155 = standard === Standard.ERC1155;

  const isNftDataLoading =
    getNftDataRequestStatus === RequestStatus.REQUEST || getNftDataRequestStatus === RequestStatus.INIT;

  const isTokenSelling = !!(isSelling || isTimedAucSelling || isAucSelling);

  const isOwner = useMemo(() => {
    if (!owners?.length || !userAddress.length) {
      return false;
    }
    return checksumAddress(owners[0].address) === checksumAddress(userAddress);
  }, [owners, userAddress]);

  const updatedSellers = useMemo(() => {
    return (sellers || []).filter(({ address }) => address !== userAddress);
  }, [sellers, userAddress]);

  const currentSeller = useMemo(() => {
    if (!sellers) {
      return null;
    }
    return sellers.find(({ address }) => address === userAddress);
  }, [sellers, userAddress]);

  const handleLikeClick = useCallback(
    (likedNftId: string) => {
      dispatch(like({ id: String(likedNftId) }));
    },
    [dispatch],
  );

  const handleUpdatePrice: ListForSaleCallback = useCallback(
    async ({ newPrice }) => {
      if (network?.name !== userNetwork) {
        await connect(provider, network?.name as Chains, false, true);
      }

      if (isSelling) {
        dispatch(
          setOnSale({
            id: String(nftId),
            data: { price: newPrice, currency: String(currentSeller?.currency?.symbol) },
            web3Provider: walletService.Web3(chain.rpc),
            isUpdatePrice: true,
          }),
        );
        return;
      }
      dispatch(
        setOnAuction({
          id: String(nftId),
          data: {
            minimalBid: newPrice,
            currency: String(currency?.symbol),
          },
          web3Provider: walletService.Web3(chain.rpc),
          tokenAddress: String(nft?.collection.address),
        }),
      );
    },
    [
      chain.rpc,
      connect,
      currency?.symbol,
      currentSeller?.currency?.symbol,
      dispatch,
      isSelling,
      network?.name,
      nft?.collection.address,
      nftId,
      provider,
      userNetwork,
      walletService,
    ],
  );

  const handleListForSale: ListForSaleCallback = useCallback(
    async ({ newPrice, newCurrency, amount, listingType, auctionDuration }) => {
      if (network?.name !== userNetwork) {
        await connect(provider, network?.name as Chains, false, true);
      }

      if (listingType !== 'Price') {
        const calculatedStartAuction = Math.floor(Date.now() / 1000);
        dispatch(
          setOnAuction({
            id: String(nftId),
            data: {
              minimalBid: newPrice,
              currency: String(newCurrency),
              amount,
              startAuction: calculatedStartAuction,
              ...(listingType === 'Time Auction' && {
                endAuction: calculatedStartAuction + Number(auctionDuration),
              }),
            },
            web3Provider: walletService.Web3(chain.rpc),
            tokenAddress: String(nft?.collection.address),
          }),
        );
        return;
      }
      dispatch(
        setOnSale({
          id: String(nftId),
          data: { price: newPrice, currency: String(newCurrency), amount },
          web3Provider: walletService.Web3(chain.rpc),
          tokenAddress: String(nft?.collection.address),
        }),
      );
    },
    [chain.rpc, connect, dispatch, network?.name, nft?.collection.address, nftId, provider, userNetwork, walletService],
  );

  const handleBurn = useCallback(
    async (amount?: number) => {
      if (network?.name !== userNetwork) {
        await connect(provider, network?.name as Chains, false, true);
      }

      dispatch(
        burn({
          amount,
          web3Provider: walletService.Web3(chain.rpc),
          id: String(id),
        }),
      );
    },
    [chain.rpc, connect, dispatch, id, network?.name, provider, userNetwork, walletService],
  );

  const handleTransfer = useCallback(
    async (recipientAddress: string, amount?: number) => {
      if (network?.name !== userNetwork) {
        await connect(provider, network?.name as Chains, false, true);
      }

      dispatch(
        transfer({
          amount,
          address: recipientAddress,
          web3Provider: walletService.Web3(chain.rpc),
          id: String(id),
        }),
      );
    },
    [network?.name, userNetwork, dispatch, walletService, chain.rpc, id, connect, provider],
  );

  const handleRemoveFromSale = useCallback(async () => {
    if (network?.name !== userNetwork) {
      await connect(provider, network?.name as Chains, false, true);
    }

    dispatch(
      removeFromSale({
        id: String(id),
        web3Provider: walletService.Web3(chain.rpc),
      }),
    );
  }, [network?.name, userNetwork, dispatch, id, walletService, chain.rpc, connect, provider]);

  const handleBuy = useCallback(
    async (sellerId: string, tokenAmount?: number, tokenPrice?: string, tokenAddress?: string) => {
      if (network?.name !== userNetwork) {
        await connect(provider, network?.name as Chains, false, true);
      }

      const token = tokenData.find(({ address }) => address === tokenAddress);
      dispatch(
        buy({
          data: {
            sellerId,
            id: String(id),
            tokenAmount: tokenAmount ?? 1,
          },
          decimals: token?.decimals,
          tokenAddress: String(tokenAddress),
          tokenPrice: String(tokenPrice),
          web3Provider: walletService.Web3(chain.rpc),
        }),
      );
    },
    [network?.name, userNetwork, tokenData, dispatch, id, walletService, chain.rpc, connect, provider],
  );

  const handleBid = useCallback(
    async (bidAmount: number) => {
      if (network?.name !== userNetwork) {
        await connect(provider, network?.name as Chains, false, true);
      }

      dispatch(
        bid({
          data: {
            currency: String(currency?.symbol),
            tokenId: String(id),
            amount: bidAmount,
          },
          decimals: currentBidTokenData?.decimals,
          tokenAddress: String(currency?.address),
          web3Provider: walletService.Web3(chain.rpc),
        }),
      );
    },
    [
      network?.name,
      userNetwork,
      dispatch,
      currency?.symbol,
      currency?.address,
      id,
      currentBidTokenData?.decimals,
      walletService,
      chain.rpc,
      connect,
      provider,
    ],
  );

  const handleEndAuction = useCallback(() => {
    dispatch(
      endAuctionAction({
        id: String(id),
        web3Provider: walletService.Web3(chain.rpc),
      }),
    );
  }, [dispatch, id, walletService, chain.rpc]);

  const handleBuyButtonClick = useCallback(
    (data?: Ownership[], isHistory?: boolean) => {
      if (!isErc1155) {
        const sellerId = sellers?.[0].url;
        const sellingTokenAddress = sellers?.[0].currency.address;
        handleBuy(String(sellerId), 0, price, sellingTokenAddress);
        return;
      }
      if (isHistory) {
        setBuyMultipleSellersState(data as Ownership[]);
        setOpenModal('buy');
        return;
      }
      setBuyMultipleSellersState(updatedSellers || []);
      setOpenModal('buy');
    },
    [handleBuy, isErc1155, price, sellers, updatedSellers],
  );

  const handlePromoteClick = () => {
    navigate(routes.pricing.root.getPath(+(nftId || 0)));
  };

  const handleConnectWallet = useCallback(
    (walletProvider: WalletProviders, selectedChain: Chains) => {
      connect(walletProvider, selectedChain);
    },
    [connect],
  );

  useEffect(() => {
    dispatch(
      getNftData({
        id: String(nftId),
        web3Provider: walletService.Web3(chain.rpc),
      }),
    );
  }, [dispatch, nftId, walletService, userAddress, chain.rpc]);

  useEffect(() => {
    dispatch(
      getRelatedTokens({
        id: String(nftId),
      }),
    );
  }, [dispatch, nftId]);

  useSmoothTopScroll(nftId);
  return (
    <Box>
      <Grid container spacing={4} mb={7} position="relative">
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          {isNftDataLoading ? (
            <ImageSkeleton />
          ) : (
            <Box sx={{ position: 'relative' }}>
              {onPromotion && <PromotionChip />}
              <NftPreview media={media || ''} format={format || ''} animation={animation || ''} />

              {!!properties?.length && <NftDetailsProperties nftProperties={properties} />}
            </Box>
          )}
        </Grid>
        <Grid order={{ xs: 3, sm: 3, md: 2 }} container item xs={12} sm={12} md={6} lg={6} xl={6}>
          {isNftDataLoading ? (
            <DataSkeleton />
          ) : (
            <NftDetailsInfoBlock
              descriptionProps={{
                name: name || '',
                inStock: Number(available),
                id: id || 0,
                description: description || '',
                owned: isErc1155 ? Number(ownedTokenAmount) : undefined,
                promotionEndTime: promotionInfo?.validUntil,
                promotionQueue: promotionInfo?.queue,
                creatorEarnings: Number(collection?.creatorRoyalty),
                network: network?.name,
              }}
              bidProps={{
                id: highestBid?.user.url,
                name: highestBid?.user.name,
                avatar: highestBid?.user.avatar,
                endAuction,
              }}
              buyProps={{
                price: price || '0',
                currency: currency?.symbol || 'ETH',
                usdPrice: usdPrice || '0',
                onBuyClick: handleBuyButtonClick,
              }}
              creatorProps={{
                type: 'creator',
                avatar: creator?.avatar || '',
                name: String(creator?.displayName || creator?.address),
                id: String(creator?.url),
              }}
              collectionProps={{
                type: 'collection',
                avatar: collection?.avatar || '',
                name: String(collection?.name),
                id: String(collection?.url),
                isVerified: collection?.isVerified,
              }}
              gameProps={{
                type: 'game',
                avatar: game?.avatar || '',
                name: game?.name || '',
                id: String(game?.network?.name),
              }}
              isOwner={isOwner}
              isSeller={!!currentSeller}
              isOtherSeller={!!updatedSellers.length}
              isAucSelling={!!(isAucSelling || isTimedAucSelling)}
              isHighestBid={!!highestBid}
              onBidClick={() => setOpenModal('bid')}
              onAcceptBidClick={() => setOpenModal('acceptBid')}
              isLogged={!!userAddress.length}
              historyProps={{
                ...convertApiHistoryData(history),
                owners:
                  isAucSelling || isTimedAucSelling
                    ? (owners || []).map((owner) => {
                        const innerOwner = { ...owner };
                        innerOwner.price = price;
                        return innerOwner;
                      })
                    : owners,
                userAddress,
                onBuyClick: (data?: Ownership[]) => handleBuyButtonClick(data, true),
                isMultiple: isErc1155,
              }}
              openConnectModal={() => setOpenModal('connect')}
            />
          )}
        </Grid>
        <Grid order={{ xs: 2, sm: 2, md: 3 }} item xs={12} sm={12} md={1} lg={1} xl={1}>
          {isNftDataLoading ? (
            <ControlsSkeleton />
          ) : (
            <NftDetailsControlBlock
              isOwner={isOwner}
              isSeller={isErc1155 ? !!currentSeller : isOwner && isTokenSelling}
              onLikeClick={() => handleLikeClick(String(nftId))}
              isLiked={!!isLiked}
              likeCount={likeCount || 0}
              currency={currentSeller?.currency?.symbol || currency?.symbol || ''}
              price={currentSeller?.price || price || ''}
              usdPrice={usdPrice || ''}
              onUpdatePrice={handleUpdatePrice}
              onListForSale={handleListForSale}
              onBurn={handleBurn}
              onTransfer={handleTransfer}
              isImported={collection?.isImported}
              rates={tokenData as Rates[]}
              isMultiple={isErc1155}
              onRemoveFromSale={handleRemoveFromSale}
              ownedTokenAmount={isErc1155 ? ownedTokenAmount : owners?.[0].quantity}
              isHighestBid={!!highestBid}
              onPromoteClick={handlePromoteClick}
              royalties={collection?.creatorRoyalty}
              serviceFee={serviceFee}
            />
          )}
        </Grid>
      </Grid>

      <BuyMultipleModal
        onBuyMultiple={handleBuy}
        sellers={buyMultipleSellersState || []}
        open={openModal === 'buy'}
        onClose={() => setOpenModal('init')}
        userAddress={userAddress}
      />
      <BidModal
        userBalance={String(currentBidTokenData?.userBalance)}
        currentHighestBid={{
          amount: String(highestBid?.amount || price),
          usdAmount: Number(usdPrice),
          currency: String(currency?.symbol),
          address: String(currency?.address),
        }}
        isHighestbid={!!highestBid}
        onBid={handleBid}
        open={openModal === 'bid'}
        onClose={() => setOpenModal('init')}
      />
      <AcceptBidModal
        currency={String(currency?.symbol)}
        highestBid={String(highestBid?.amount)}
        highestBidUsd={String(usdPrice)}
        onAcceptBid={handleEndAuction}
        bidder={{
          name: String(highestBid?.user.name),
          avatar: highestBid?.user.avatar,
        }}
        open={openModal === 'acceptBid'}
        onClose={() => setOpenModal('init')}
      />
      <ConnectWalletModal
        onConnectWallet={handleConnectWallet}
        open={openModal === 'connect'}
        onClose={() => setOpenModal('init')}
      />
      {!!relatedTokens.length && (
        <Carousel
          sx={{ mb: 10, padding: '0px !important' }}
          header={
            <Typography
              variant="h4"
              letterSpacing="-0.01em"
              sx={{
                mr: theme.spacing(0.75),
                mb: 4,
              }}
            >
              From this collection
            </Typography>
          }
        >
          {relatedTokens.map((token) => {
            return <NftCard key={token.internalId} onLikeClick={() => handleLikeClick(String(token.id))} {...token} />;
          })}
        </Carousel>
      )}
    </Box>
  );
};
