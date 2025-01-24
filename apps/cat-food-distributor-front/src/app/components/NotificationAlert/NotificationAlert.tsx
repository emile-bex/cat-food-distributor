'use client'

import { Alert, Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material/Alert/Alert';
import { useCallback, useEffect, useState } from 'react';

interface NotificationAlertProps {
  message: string | null;
  type: AlertColor;
}

export function NotificationAlert({ message, type }: NotificationAlertProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity={type} onClose={handleClose}>{message}</Alert>
    </Snackbar>
  );
}
