'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '@cat-food-distributor/shared/data-access/store';
import { authSelectors } from '@cat-food-distributor/shared/auth/data-access';

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
