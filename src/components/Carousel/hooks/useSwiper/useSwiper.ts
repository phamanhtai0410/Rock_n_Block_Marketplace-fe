import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowState } from 'hooks';
import SwiperCore from 'swiper';
import { Optional } from 'types';

import { ANIMATION_SPEED } from './useSwiper.constants';

interface ReturnType {
  setSwiper: (swiper?: SwiperCore) => void;
  isNextEnabled: boolean;
  isPrevEnabled: boolean;
  windowWidth: Optional<number>;
  canSwipe: boolean;
  handleSliceChange: (swiper: SwiperCore) => void;
  handleNextClick: () => void;
  handlePrevClick: () => void;
  swiper?: SwiperCore;
}

export const useSwiper = (
  slideStep: number,
  initialIsNextEnabled = false,
  initialIsPrevEnabled = false,
): ReturnType => {
  const [swiper, setSwiper] = useState<Optional<SwiperCore>>();
  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(() => !!initialIsNextEnabled);
  const [isPrevEnabled, setIsPrevEnabled] = useState<boolean>(() => !!initialIsPrevEnabled);
  const { width: windowWidth } = useWindowState();

  const canSwipe = useMemo(() => {
    if (!swiper) {
      return true;
    }
    const swiperElements = swiper?.$wrapperEl.children('.swiper-slide');
    if (!swiperElements.length) {
      return false;
    }
    const singleSlideWidth = swiperElements.outerWidth();
    const trackWidth = singleSlideWidth * swiperElements.length;
    return trackWidth > windowWidth;
  }, [swiper, windowWidth, swiper?.$wrapperEl.children('.swiper-slide')]);

  useEffect(() => {
    if (swiper) {
      setIsNextEnabled(!swiper.isEnd);
      setIsPrevEnabled(!swiper.isBeginning);
    }
  }, [swiper]);

  const handleSliceChange = useCallback((swiperCore: SwiperCore) => {
    setIsNextEnabled(!swiperCore.isEnd);
    setIsPrevEnabled(!swiperCore.isBeginning);
  }, []);

  const handleNextClick = useCallback(() => {
    for (let index = 0; index < slideStep; index += 1) {
      swiper?.slideNext(ANIMATION_SPEED);
    }
  }, [swiper, slideStep]);

  const handlePrevClick = useCallback(() => {
    for (let index = 0; index < slideStep; index += 1) {
      swiper?.slidePrev(ANIMATION_SPEED);
    }
  }, [swiper, slideStep]);

  return {
    setSwiper,
    isNextEnabled,
    isPrevEnabled,
    windowWidth,
    handleSliceChange,
    handleNextClick,
    handlePrevClick,
    canSwipe,
    swiper,
  };
};
