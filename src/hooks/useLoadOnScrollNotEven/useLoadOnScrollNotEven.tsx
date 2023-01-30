import { useEffect, useMemo } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

export interface Args {
  currentPage: number;
  loadMore: () => void;
  config: IntersectionOptions;
}

export const useLoadOnScrollNotEven = ({ currentPage, loadMore, config: { threshold = 0.2, delay = 100 } }: Args) => {
  const isPageEven = useMemo(() => currentPage % 2 === 0, [currentPage]);

  const { ref, inView } = useInView({
    threshold,
    delay,
    skip: isPageEven,
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]); // Do not touch deps

  return { ref };
};
