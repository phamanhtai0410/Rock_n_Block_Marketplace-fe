import { COLOR_GRAY_200, COLOR_NEUTRALS_4, COLOR_NEUTRALS_6, COLOR_NEUTRALS_7 } from 'theme/colors';

export enum NftDetailsHistoryTabs {
  owners = 'Owners',
  history = 'History',
}

export const nftDetailsHistoryColors = {
  light: {
    colorNftDetailsHistoryTabsBorder: COLOR_NEUTRALS_6,
    colorNftDetailsHistoryTabActiveText: COLOR_NEUTRALS_7,
    colorNftDetailsHistoryTabNotActiveText: COLOR_NEUTRALS_4,
  },
  dark: {
    colorNftDetailsHistoryTabsBorder: COLOR_GRAY_200,
    colorNftDetailsHistoryTabActiveText: COLOR_NEUTRALS_7,
    colorNftDetailsHistoryTabNotActiveText: COLOR_NEUTRALS_4,
  },
};
