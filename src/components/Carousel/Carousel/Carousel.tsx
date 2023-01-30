import React, { FC, ReactElement, ReactNode, useMemo } from 'react';
import { Box, Container, ContainerProps, Typography, useMediaQuery, useTheme } from '@mui/material';
import { omit } from 'lodash';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { useSwiper } from '../hooks/useSwiper';
import { NavigationButtons } from '../NavigationButtons';

import { SLIDE_STEP } from './Carousel.constants';

import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.min.css';

export interface CarouselProps {
  dataId?: string;
  header?: ReactElement;
  children?: ReactNode;
  initialSlide?: number;
  loop?: boolean;
  swiperProps?: SwiperProps;
  isSmall?: boolean;
  emptyDataElement?: ReactElement | string;
}

export const Carousel: FC<CarouselProps & ContainerProps> = ({
  children,
  header,
  dataId,
  initialSlide = 0,
  loop,
  swiperProps,
  isSmall,
  emptyDataElement = 'Nothing to show',
  ...containerProps
}) => {
  const {
    setSwiper,
    canSwipe,
    isNextEnabled,
    isPrevEnabled,
    windowWidth,
    handleSliceChange,
    handleNextClick,
    handlePrevClick,
  } = useSwiper(SLIDE_STEP, true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isEnableToLoop = useMemo(
    () => (React.Children.count(children) > 3 && loop) || (React.Children.count(children) >= 3 && isSmallScreen),
    [children, loop, isSmallScreen],
  );

  const isDataEmpty = React.Children.count(children) === 0;

  return (
    <Container
      {...containerProps}
      id={dataId}
      sx={{
        position: 'relative',
        zIndex: 20,
        ...containerProps?.sx,
      }}
    >
      {header && <Box>{header}</Box>}
      <Swiper
        key={windowWidth}
        initialSlide={initialSlide}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => {
          handleSliceChange(swiper);
          if (swiperProps?.onSlideChange) {
            swiperProps?.onSlideChange(swiper);
          }
        }}
        style={{ paddingTop: '8px' }}
        loop={isEnableToLoop}
        breakpoints={{
          [theme.breakpoints.values.xs]: {
            slidesPerView: 1.2,
            spaceBetween: 32,
          },
          [theme.breakpoints.values.sm]: {
            slidesPerView: 2.2,
            spaceBetween: 32,
          },
          [theme.breakpoints.values.md]: {
            slidesPerView: 3.3,
            spaceBetween: 32,
          },
          [theme.breakpoints.values.lg]: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        {...omit(swiperProps, 'onSlideChange')}
      >
        {!isDataEmpty ? (
          React.Children.map(children, (element, idx) => <SwiperSlide key={element?.toString()}>{element}</SwiperSlide>)
        ) : (
          <Typography sx={{ py: 6 }} variant="h4" textAlign="center">
            {emptyDataElement}
          </Typography>
        )}
      </Swiper>

      {React.Children.count(children) > 1 && !isDataEmpty && canSwipe && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5,
          }}
        >
          <NavigationButtons
            leftButtonProps={{
              disabled: loop ? false : !isPrevEnabled,
              onClick: handlePrevClick,
              sx: {
                mr: 2,
                ...(!isSmall && {
                  [theme.breakpoints.up(theme.breakpoints.values.lg + 80)]: {
                    position: 'absolute',
                    left: `-${theme.spacing(3)}`,
                    top: '50%',
                    transform: 'translateY(calc(-50% + 16px))',
                  },
                }),
              },
            }}
            rightButtonProps={{
              disabled: loop ? false : !isNextEnabled,
              onClick: handleNextClick,
              sx: {
                ...(!isSmall && {
                  [theme.breakpoints.up(theme.breakpoints.values.lg + 80)]: {
                    position: 'absolute',
                    right: `-${theme.spacing(3)}`,
                    top: '50%',
                    transform: 'translateY(calc(-50% + 16px))',
                  },
                }),
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};
