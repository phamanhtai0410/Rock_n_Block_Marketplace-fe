import { useSearchParams } from 'react-router-dom';

export const useGetQuery = (queryName: string) => {
  const [searchParams] = useSearchParams();

  return searchParams.get(queryName) || '';
};
