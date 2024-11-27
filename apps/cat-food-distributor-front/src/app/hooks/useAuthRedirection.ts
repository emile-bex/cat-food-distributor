'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector, authSelectors } from '@cat-food-distributor/shared/data-access/store';

export function useAuthRedirection() {
  const { replace } = useRouter();
  const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
  const isFetchingToken = useAppSelector(authSelectors.selectIsFetchingToken);

  useEffect(() => {
    if (isAuthenticated) {
      replace('home');
    } else {
      replace('auth');
    }
  }, [replace, isAuthenticated]);

  return { isAuthenticated, isFetchingToken };
}
