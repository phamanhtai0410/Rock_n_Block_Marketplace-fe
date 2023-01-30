import { IFilters } from './useFilters';

export const convertFiltersToSearchParams = (filterName: string, filterValue: string | number): string => {
  const urlParams = new URLSearchParams(window.location.search);
  if (!filterValue) {
    urlParams.delete(filterName);
  } else {
    urlParams.set(filterName, filterValue.toString());
  }
  return `?${urlParams.toString()}`;
};

interface IAdditionalFilters {
  category?: string;
  collection?: string;
  page?: number;
  onAnySale?: boolean;
}

export const convertFiltersForBackend = (filters: IFilters, additionalFilters: IAdditionalFilters) => {
  const { nftStandard, sellType, activeCollection, maxPrice, orderBy, presearch } = filters;

  const { category, page, collection, onAnySale } = additionalFilters;

  return {
    ...(nftStandard && { standard: nftStandard }),
    ...(sellType === 'auction' && { on_auc_sale: true }),
    ...(sellType === 'fix' && { on_sale: true }),
    ...(category && { categories: category }),
    ...(collection && { collections: collection }),
    ...(activeCollection && { tags: activeCollection }),
    ...(maxPrice && { max_price: maxPrice }),
    ...(orderBy && { order_by: orderBy }),
    ...(presearch && { text: presearch }),
    on_any_sale: presearch ? false : onAnySale,
    page,
  };
};

export const orderByOptions = [
  { value: '-created_at', title: 'Recently added' },
  { value: 'created_at', title: 'Long added' },
  { value: '-price', title: 'Highest price' },
  { value: 'price', title: 'Lowest price' },
  { value: '-likes', title: 'Most liked' },
  { value: 'likes', title: 'Less liked' },
];

export const nftStandardOptions = [
  { value: '', title: 'All NFT' },
  { value: 'ERC721', title: '721 NFT' },
  { value: 'ERC1155', title: '1155 NFT' },
];

export const DEFAULT_VALUE_FOR_ALL_OPTION = '';
