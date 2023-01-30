import { Collection } from 'components/Icon/components/Collection/Collection';
import { GreenCard } from 'components/Icon/components/GreenCard/GreenCard';
import { GreenWallet } from 'components/Icon/components/GreenWallet/GreenWallet';
import { Target } from 'components/Icon/components/Target/Target';

export const createAndSellHelper = [
  {
    title: 'Connect your wallet',
    step: 'Step 1',
    text: 'If you want to browse marketplace from a mobile device, select Wallet Connect in the wallets list or open the website in the built-in browser of the wallet app.',
    Icon: GreenCard,
  },
  {
    title: 'Create Collection',
    step: 'Step 2',
    text: 'You can create your own collection of 721 or 1155 NFTs and set creator royalties to earn from re-selling your NFTs. ',
    Icon: Collection,
  },
  {
    title: 'Create your NFTs',
    step: 'Step 3',
    text: 'You can create NFTs by uploading pictures, animations, 3D, music and videos and add them to your collections or to the common collection of Marketplace.',
    Icon: Target,
  },
  {
    title: 'List NFTs for sale',
    step: 'Step 4',
    text: 'You can put NFTs for sale for desired price or place it on auction. Timed auction will be completed automatically after the auction time is expired. ',
    Icon: GreenWallet,
  },
];
