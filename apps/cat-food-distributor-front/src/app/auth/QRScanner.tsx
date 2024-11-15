'use client';

import { Scanner, useDevices } from '@yudiel/react-qr-scanner';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../use-cases/hooks';
import { authActions } from '../../use-cases/auth';
import { isMACAddress } from 'validator';

const QRCodeType = 'qr_code' as const;

export function QRScanner() {
  const dispatch = useAppDispatch();
  const dispatch2 = useDispatch();
  const devices = useDevices();

  return <Scanner onScan={(result) => {
    console.log(result);
    const { format, rawValue } = result[0];
    if (format === QRCodeType && isMACAddress(rawValue)) {
      dispatch(authActions.loginRequested({ distributorId: rawValue }));
    }
  }} />;
}
