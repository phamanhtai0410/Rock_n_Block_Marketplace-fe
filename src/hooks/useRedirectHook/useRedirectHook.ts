import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useShallowSelector } from 'hooks/useShallowSelector';
import userSelector from 'store/user/selectors';

export type useRedirectHookProps = {
  isEntityLoaded: boolean;
  id: string | number;
};

export const useRedirectHook = ({ id, isEntityLoaded }: useRedirectHookProps) => {
  const navigate = useNavigate();
  const { id: userId } = useShallowSelector(userSelector.getProp('user'));

  useEffect(() => {
    if (isEntityLoaded && id !== userId) {
      navigate('/404');
    }
  }, [isEntityLoaded, navigate, userId, id]);
};
