'use client';

import { QRScanner } from './QRScanner';
import { useAuthRedirection } from '../components/useAuthRedirection';
import { CircularProgress } from '@mui/material';
import { selectIsLoading } from '../../use-cases/auth';
import { useAppSelector } from '../../use-cases/hooks';

export default function AuthPage() {
  const isAuthenticated = useAuthRedirection();
  const isLoading = useAppSelector(selectIsLoading);

  if (isAuthenticated || isLoading) {
    return <CircularProgress />;
  }
  return <QRScanner />;
};
