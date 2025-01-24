'use client';

import { useAppSelector } from '@cat-food-distributor/shared/data-access/store';
import { authSelectors } from '@cat-food-distributor/shared/auth/data-access';

export function useAuth() {
  const isLoading = useAppSelector(authSelectors.selectIsLoading);
  const error = useAppSelector(authSelectors.selectLoginError);

  return { isLoading, error };
}
