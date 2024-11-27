'use client';

import { useAuthRedirection } from './hooks/useAuthRedirection';
import { Spinner } from './components';

export default function IndexPage() {
  useAuthRedirection();
  return <Spinner />;
}
