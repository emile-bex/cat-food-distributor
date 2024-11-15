import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector, authSelectors } from '@cat-food-distributor/store-react';

export function useAuthRedirection() {
  const { replace } = useRouter();
  const token = useAppSelector(authSelectors.selectToken);
  const isAuthenticated = !!token

  useEffect(() => {
    if (token) {
      replace('home');
    } else {
      replace('auth');
    }
  }, [replace, token]);

  return isAuthenticated
}
