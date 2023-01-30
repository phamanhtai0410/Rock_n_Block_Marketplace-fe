import { ChangeEvent, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { noop } from 'lodash';
import { RequestStatus } from 'types';

import { SearchInput } from './SearchInput';
import mockImage from './unsplash_E8Ufcyxz514.png';

export default {
  title: 'components/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const mockNfts = [
  {
    id: 1,
    image: mockImage,
    name: 'Super NFT',
  },
  {
    id: 2,
    image: mockImage,
    name: 'CryptoPunk Rare',
  },
  {
    id: 3,
    image: mockImage,
    name: 'Appe Lol stuff',
  },
  {
    id: 4,
    image: mockImage,
    name: 'Amazing NFT',
  },
  {
    id: 5,
    image: mockImage,
    name: 'Crypto Asset Lol mem Cheap',
  },
  {
    id: 6,
    image: mockImage,
    name: 'Some stupid NFT',
  },
  {
    id: 7,
    image: mockImage,
    name: 'Some stupid NFT',
  },
  {
    id: 8,
    image: mockImage,
    name: 'Bali',
  },
  {
    id: 9,
    image: mockImage,
    name: 'Paris Lauche',
  },
];

const Template: ComponentStory<typeof SearchInput> = () => {
  // const { presearchedNfts } = useShallowSelector(nftSelectors.getNfts);
  // const dispatch = useDispatch();
  const [presearchedNfts, setPresearchedNfts] = useState(mockNfts);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value) {
      setPresearchedNfts(mockNfts.filter((nft) => nft.name.toLowerCase().includes(event.target.value.toLowerCase())));
    } else {
      setPresearchedNfts([]);
    }
    // dispatch(searchNfts({ query: event.target.value }));
  }, []);

  return (
    <Box>
      <SearchInput
        placeholder="NFT name, ID"
        onChange={handleChange}
        fullWidth
        handleResultClick={noop}
        presearchNfts={{} as any}
        searchNftsStatus={RequestStatus.SUCCESS}
      />
    </Box>
  );
};
export const Default = Template.bind({});
