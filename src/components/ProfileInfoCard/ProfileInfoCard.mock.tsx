import { mockImage } from 'assets/images';
import { noop } from 'lodash';

export const ProfileInfoCardPropsMocked = {
  id: 1,
  avatar: mockImage,
  name: 'Me',
  address: '0x0x0x0x0x0',
  followerCount: '12',
  followingCount: '1',
  bio: 'string',
  site: '',
  email: '',
  twitter: '',
  instagram: '',
  facebook: '',
  createdDate: '',
  isShowFollowing: false,
  isFollowing: false,
  onFollowClick: noop,
};
