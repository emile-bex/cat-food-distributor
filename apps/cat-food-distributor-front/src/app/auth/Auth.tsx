'use client';

import { QRScanner } from './QRScanner';
import { useAppSelector } from '@cat-food-distributor/shared/data-access/store';
import { authSelectors } from '@cat-food-distributor/shared/auth/data-access';
import { Spinner } from '../components';
import { Alert } from '@mui/material';

export default function Auth() {
  const isLoading = useAppSelector(authSelectors.selectIsLoading);
  const error = useAppSelector(authSelectors.selectLoginError);

  if (isLoading) {
    return <Spinner />;
  }

  return <><QRScanner /><Alert severity="error">{error}</Alert></>;
};
