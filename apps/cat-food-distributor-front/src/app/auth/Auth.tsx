'use client';

import { QRScanner } from './QRScanner';
import { useAppSelector, authSelectors } from '@cat-food-distributor/shared/data-access/store';
import { Spinner } from '../components';

export default function Auth() {
  const isLoading = useAppSelector(authSelectors.selectIsLoading);

  if (isLoading) {
    return <Spinner />
  }
  return <QRScanner />;
};
