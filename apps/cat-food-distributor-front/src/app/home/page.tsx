'use client';

import { CircularProgress } from '@mui/material';
import { useAuthRedirection } from '../components/useAuthRedirection';

export default function HomePage() {
  const isAuthenticated = useAuthRedirection();

  if (!isAuthenticated) {
    return <CircularProgress />;
  }

  return <div><span>hello</span></div>;
}
