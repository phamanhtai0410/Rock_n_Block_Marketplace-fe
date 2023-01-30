import { COLOR_MAIN_BG_DARK, COLOR_NEUTRALS_8 } from 'theme/colors';

export const backgroundBoxColors = {
  light: {
    backgroundBanner: 'transparent',
    backgroundWithImage: COLOR_NEUTRALS_8,
    backgroundDefault: COLOR_NEUTRALS_8,
  },
  dark: {
    backgroundBanner: 'linear-gradient(180deg, #090306 0%, rgba(8, 8, 8, 0.848538) 95%, rgba(0, 0, 0, 0) 100%)',
    backgroundWithImage: COLOR_MAIN_BG_DARK,
    backgroundDefault: 'linear-gradient(180deg, rgba(29, 25, 51, 0.5) 0%, rgba(29, 25, 51, 0) 100%)',
  },
};
