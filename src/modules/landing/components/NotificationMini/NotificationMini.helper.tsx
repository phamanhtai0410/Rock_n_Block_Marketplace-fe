import { routes } from 'appConstants';
import { COLOR_NEUTRALS_1, COLOR_NEUTRALS_2, COLOR_NEUTRALS_6_LIGHT, COLOR_NEUTRALS_8 } from 'theme/colors';
import { Method } from 'types/api/enums';

const NAME_MASK = '{{ name }}';
const AMOUNT_MASK = '{{ amount }}';
const PRICE_MASK = '{{ price }}';
const CURRENCY_MASK = '{{ currency }}';
const PRONOUN_MASK = '{{ pronoun }}';

const TO_NAME_MASK = '{{ toName }}';

export const textHelper: Record<Method, string> = {
  [Method.like]: `<span>${NAME_MASK}</span> liked ${PRONOUN_MASK} NFT`,
  [Method.Bet]: `<span>${NAME_MASK}</span> placed a bid <span>${PRICE_MASK}</span> ${CURRENCY_MASK} on ${PRONOUN_MASK} NFT`,
  [Method.Buy]: `<span>${TO_NAME_MASK}</span> purchased ${PRONOUN_MASK} NFT for <span>${PRICE_MASK}</span> ${CURRENCY_MASK}`,
  [Method.follow]: `<span>${NAME_MASK}</span> started following <span>${TO_NAME_MASK}</span>`,
  [Method.Transfer]: `transfered to <span>${NAME_MASK}</span>`,
  [Method.Mint]: `<span>${NAME_MASK}</span> minted <span>${AMOUNT_MASK}</span> NFT(s)`,
  [Method.Burn]: `burned <span>${PRICE_MASK}</span>`,
  [Method.Listing]: `<span>${NAME_MASK}</span> listed <span>${AMOUNT_MASK}</span> NFT(s) for <span>${PRICE_MASK} ${CURRENCY_MASK}</span>`,
  [Method.AuctionWin]: `your bid for <span>${NAME_MASK}</span> was accepted`,
};

export const notificationMiniColors = {
  light: {
    colorNotificationMiniBackground: COLOR_NEUTRALS_8,
    colorNotificationMiniBackgroundAll: COLOR_NEUTRALS_6_LIGHT,
    colorNotificationMiniColorsNoImageBoxBackground: COLOR_NEUTRALS_6_LIGHT,
    boxShadowNotificationMini: '0px 8px 16px -8px rgba(15, 15, 15, 0.2)',
    colorcolorNotificationMiniText: COLOR_NEUTRALS_2,
  },
  dark: {
    colorNotificationMiniBackground: COLOR_NEUTRALS_1,
    colorNotificationMiniBackgroundAll: COLOR_NEUTRALS_1,
    colorNotificationMiniColorsNoImageBoxBackground: COLOR_NEUTRALS_2,
    boxShadowNotificationMini: 'none',
    colorcolorNotificationMiniText: COLOR_NEUTRALS_8,
  },
};
