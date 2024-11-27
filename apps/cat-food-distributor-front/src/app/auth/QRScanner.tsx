'use client';

import { Scanner } from '@yudiel/react-qr-scanner';
import { isMACAddress } from 'validator';
import { authActions } from '@cat-food-distributor/shared/auth/data-access';
import { useAppDispatch } from '@cat-food-distributor/shared/data-access/store';
import { Container } from '@mui/material';

const QRCodeType = 'qr_code' as const;

export function QRScanner() {
  const dispatch = useAppDispatch();

  return <Container><Scanner onScan={(result) => {
    const { format, rawValue } = result[0];
    if (format === QRCodeType && isMACAddress(rawValue)) {
      dispatch(authActions.loginRequested({ distributorId: rawValue }));
    }
  }} /></Container>;
}
