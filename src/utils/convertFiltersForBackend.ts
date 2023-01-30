import { IFilters } from '../hooks/useFilters';

interface IAdditionalFilters {
  category?: string;
  collection?: string | number;
  page?: number;
  onAnySale?: boolean;
}

export const convertFiltersForBackend = (filters: IFilters, additionalFilters: IAdditionalFilters) => {
  const { nftStandard, minPrice, maxPrice, orderBy } = filters;

  const { category, page, collection } = additionalFilters;

  // TODO add filters for backend
  return {
    ...(nftStandard && { standard: nftStandard }),
    ...(category && { categories: category }),
    ...(collection && { collections: collection }),
    ...(minPrice && { min_price: minPrice }),
    ...(maxPrice && { max_price: maxPrice }),
    ...(orderBy && { order_by: orderBy }),
    page,
  };
};
