'use client';

import { QRScanner } from './QRScanner';
import { useAuthRedirection } from '../components/useAuthRedirection';
import { CircularProgress } from '@mui/material';
import { useAppSelector, authSelectors } from '@cat-food-distributor/store-react';

export default function AuthPage() {
  const isAuthenticated = useAuthRedirection();
  const isLoading = useAppSelector(authSelectors.selectIsLoading);

  if (isAuthenticated || isLoading) {
    return <CircularProgress />;
  }
  return <QRScanner />;
};
