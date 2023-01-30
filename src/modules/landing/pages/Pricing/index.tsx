import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { pricingBackgroundImage } from 'assets/images';
import BigNumber from 'bignumber.js';
import { Carousel, Spinner } from 'components';
import { Lightning } from 'components/Icon/components';
import { useModal, useShallowSelector, useWindowState } from 'hooks';
import { AgreeToPromoteModal } from 'modules/landing/pages/Pricing/components/AgreeToPromoteModal';
import { useWalletConnectorContext } from 'services';
import { getNftData, getPromotionData, promote } from 'store/nft/actions';
import actionTypes from 'store/nft/actionTypes';
import nftSelectors from 'store/nft/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_2 } from 'theme/colors';
import { Chains, Nullable, RequestStatus, Themes } from 'types';
import { flexHelper } from 'utils';

import { PricingCard } from './components/PricingCard';
import { PromotionData } from './Pricing.types';

export const Pricing = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isAgreeModalVisible, setAgreeModalVisible, onCloseAgreeModal] = useModal(false);

  const { id: nftId } = useParams();

  const { [actionTypes.GET_NFT_DATA]: nftDataRequest } = useShallowSelector(uiSelector.getUI);

  const navigate = useNavigate();

  const { fullHeight } = useWindowState();

  const isUpMedium = useMediaQuery(theme.breakpoints.up('md'));

  const { promotion: promotions, nft } = useShallowSelector(nftSelectors.getNft);

  const { tokenData, theme: colorTheme, user, chain, network, provider } = useShallowSelector(userSelector.getUser);

  const { walletService, connect } = useWalletConnectorContext();

  const [selectedPromotionData, setSelectedPromotionData] = useState<Nullable<PromotionData>>(null);

  const promotion = useMemo(() => {
    return promotions?.find((prom) => prom?.network?.name === nft?.network?.name);
  }, [promotions, nft?.network?.name]);

  const handlePromotionSelect = (newPromotionData: PromotionData) => {
    setSelectedPromotionData(newPromotionData);
  };

  const handlePromotionBuy = async () => {
    const getPayingTokenData = tokenData.find(({ symbol }) => symbol === selectedPromotionData?.currency);
    const payingAmount = new BigNumber(Number(selectedPromotionData?.usdPrice))
      .dividedBy(Number(getPayingTokenData?.rate))
      .multipliedBy(1.01)
      .toString();

    if (nft?.network.name !== network) {
      await connect(provider, nft?.network.name as Chains, false, true);
    }

    dispatch(
      promote({
        tokenAmount: payingAmount,
        tokenAddress: String(getPayingTokenData?.address),
        web3Provider: walletService.Web3(chain.rpc),
        decimals: getPayingTokenData?.decimals,
        data: {
          package: Number(selectedPromotionData?.package),
          currency: String(selectedPromotionData?.currency),
          tokenId: String(nftId),
        },
      }),
    );
  };

  const handlePromotionBuyClick = () => {
    if (promotion?.availableSlots) {
      handlePromotionBuy();
    } else {
      setAgreeModalVisible();
    }
  };

  const handleChangeAgree = (isAgree: boolean) => {
    if (isAgree) {
      onCloseAgreeModal();
      handlePromotionBuy();
    } else {
      onCloseAgreeModal();
    }
  };

  useEffect(() => {
    dispatch(getPromotionData());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (!nft) {
      dispatch(
        getNftData({
          id: String(nftId),
          web3Provider: walletService.Web3(chain.rpc),
        }),
      );
    }
  }, [chain.rpc, dispatch, nft, nftId, walletService]);

  useEffect(() => {
    if (nftDataRequest === RequestStatus.SUCCESS) {
      if (!nft?.owners?.find((el) => el.address === user.address)) {
        navigate('/404');
      } else if (nft.network.name !== network) {
        connect(provider, nft.network.name as Chains, false, true);
      }
    }
  }, [connect, navigate, network, nft, nftDataRequest, provider, user.address]);

  if (!nft || nftDataRequest === RequestStatus.REQUEST) {
    return <Spinner size="xl" position="center" />;
  }

  return (
    <>
      {colorTheme === Themes.dark && (
        <Box
          sx={{
            background: `url(${pricingBackgroundImage}) center no-repeat`,
            backgroundSize: 'cover',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100vw',
            height: fullHeight,
          }}
        />
      )}
      <Box
        sx={{
          marginBottom: 8,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            ...flexHelper(),
            flexDirection: { xs: 'column', md: 'row' },
            marginBottom: 3,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLOR_NEUTRALS_2,
              borderRadius: '50%',
              marginRight: 2,
            }}
          >
            <Lightning viewBox="0 0 14 18" />
          </Box>

          <Box>
            <Typography variant="h3" sx={{ whiteSpace: 'nowrap' }}>
              Pricing promote
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginBottom: 4 }}>
          <Typography className="xl" sx={{ textAlign: 'center' }}>
            Your NFT will be at the top of category page
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: 950,
            px: 2,
            margin: '0 auto',
          }}
        >
          {isUpMedium ? (
            <Stack direction="row" spacing={{ xs: 0, sm: 1, md: 3 }} sx={{ marginBottom: 8, width: '100%' }}>
              {promotion?.options?.map((option) => (
                <PricingCard
                  key={option.days}
                  price={option.usdPrice}
                  days={Number(option.days)}
                  packageNumber={option.package}
                  onPromotionSelect={handlePromotionSelect}
                  onPromotionBuy={handlePromotionBuyClick}
                  selectedPromotionData={selectedPromotionData}
                  rates={tokenData}
                />
              ))}
            </Stack>
          ) : (
            <Carousel
              loop
              swiperProps={{
                initialSlide: 1,
                slidesPerView: 0.9,
                spaceBetween: 24,
                centeredSlides: true,
                breakpoints: {
                  [theme.breakpoints.values.xs]: {
                    slidesPerView: 0.9,
                    spaceBetween: 32,
                  },
                  [theme.breakpoints.values.sm]: {
                    slidesPerView: 1.5,
                    spaceBetween: 32,
                  },
                },
              }}
            >
              {promotion?.options?.map((option) => (
                <PricingCard
                  key={option.days}
                  price={option.usdPrice}
                  days={Number(option.days)}
                  packageNumber={option.package}
                  onPromotionSelect={handlePromotionSelect}
                  onPromotionBuy={handlePromotionBuy}
                  selectedPromotionData={selectedPromotionData}
                  rates={tokenData}
                />
              ))}
            </Carousel>
          )}
        </Box>
      </Box>
      {isAgreeModalVisible && (
        <AgreeToPromoteModal
          onClose={onCloseAgreeModal}
          onChangeAgree={handleChangeAgree}
          visible={isAgreeModalVisible}
        />
      )}
    </>
  );
};
