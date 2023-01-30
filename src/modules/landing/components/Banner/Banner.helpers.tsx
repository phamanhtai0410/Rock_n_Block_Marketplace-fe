import {
  bannerDarkBackgroundImage,
  bannerDarkImage,
  bannerLightBackgroundImage,
  bannerLightImage,
} from 'assets/images';

export const bannerColors = {
  light: {
    colorBannerBackground: 'linear-gradient(180deg, #FFFFFF 12.13%, rgba(255, 255, 255, 0) 55.96%)',
    bannerImage: bannerLightImage,
    bannerImageBackground: bannerLightBackgroundImage,
  },
  dark: {
    colorBannerBackground: 'transparent',
    bannerImage: bannerDarkImage,
    bannerImageBackground: bannerDarkBackgroundImage,
  },
};

export const backgroundImageGradient = 'linear-gradient(360deg, #070B24 0%, rgba(7, 11, 36, 0) 100%)';
