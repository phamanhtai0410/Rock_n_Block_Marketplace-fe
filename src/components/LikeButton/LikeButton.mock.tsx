import { noop } from 'lodash';

import { LikeButtonProps } from './LikeButton';

export const likeButtonPropsMocked: LikeButtonProps = {
  onClick: noop,
  isLiked: false,
  likeCount: 0,
};
