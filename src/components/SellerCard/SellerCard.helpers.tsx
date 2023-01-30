import { Cup, Donut, Doughnut, Lightning } from 'components/Icon/components';
import { COLOR_NEUTRALS_1, COLOR_NEUTRALS_2, COLOR_NEUTRALS_8, COLOR_PRIMARY_1, COLOR_PRIMARY_4 } from 'theme/colors';

export const getIconFromPlace = (place: number, color: string) => {
  switch (place) {
    case 1:
      return <Cup sx={{ color, width: '16px', height: '16px' }} />;
    case 2:
      return <Doughnut sx={{ color, width: '16px', height: '16px' }} />;
    case 3:
      return <Donut sx={{ color, width: '16px', height: '16px' }} />;
    default:
      return <Lightning sx={{ color, width: '16px', height: '16px' }} />;
  }
};

export const placeColors = {
  pink: COLOR_PRIMARY_1,
  green: COLOR_PRIMARY_4,
  black: COLOR_NEUTRALS_2,
};

export const textColors = {
  pink: COLOR_NEUTRALS_8,
  green: COLOR_NEUTRALS_1,
  black: COLOR_NEUTRALS_8,
};
