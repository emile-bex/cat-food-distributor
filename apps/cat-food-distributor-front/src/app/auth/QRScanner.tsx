'use client';

import { Scanner, useDevices } from '@yudiel/react-qr-scanner';
import { useDispatch } from 'react-redux';
import { isMACAddress } from 'validator';
import { authActions, useAppDispatch } from '@cat-food-distributor/store-react';

const QRCodeType = 'qr_code' as const;

export function QRScanner() {
  const dispatch = useAppDispatch();

  return <Scanner onScan={(result) => {
    console.log(result);
    const { format, rawValue } = result[0];
    if (format === QRCodeType && isMACAddress(rawValue)) {
      dispatch(authActions.loginRequested({ distributorId: rawValue }));
    }
  }} />;
}
