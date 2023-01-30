import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';

export const useCheckPrivateRoute = (pathname: string) => {
  const address = useShallowSelector(userSelector.getProp('address'));
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/get-rewards' && !address) {
      navigate('/');
    }
  }, [address.length, navigate, pathname]);
};
