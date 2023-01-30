import { noop } from 'lodash';
import { NftStandard } from 'types';

export const CollectionContainerPropsMocked = {
  onSubmit: noop,
  isStatusRequest: false,
  isStatusSuccess: false,
  formValues: {
    name: 'string',
    symbol: 'string',
    description: 'string',
    creatorRoyalty: 'string',
    standard: NftStandard.ERC1155,
    avatar: null,
    socials: {
      site: 'string',
      twitter: 'string',
      telegram: 'string',
      instagram: 'string',
      discord: 'string',
      medium: 'string',
    },
  },
};
