'use client';

import { useAuthRedirection } from '../hooks/useAuthRedirection';
import { Spinner } from '../components';
import Auth from './Auth';

export default function AuthPage() {
  const { isFetchingToken, isAuthenticated } = useAuthRedirection();

  if (isFetchingToken || isAuthenticated) {
    return <Spinner />
  }

  return <Auth />
};
