'use client';

import { useAuthRedirection } from '../hooks/useAuthRedirection';
import { Home } from './Home';
import { Spinner } from '../components';

export default function HomePage() {
  const { isAuthenticated, isFetchingToken } = useAuthRedirection();

  if (isFetchingToken || !isAuthenticated) {
    return <Spinner />;
  }

  return <Home />;
}
