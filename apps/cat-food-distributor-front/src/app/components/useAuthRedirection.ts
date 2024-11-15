'use client'

import { useRouter } from 'next/navigation';
import { selectToken } from '../../use-cases/auth';
import { useEffect } from 'react';
import { useAppSelector } from '../../use-cases/hooks';

export function useAuthRedirection() {
  const { replace } = useRouter();
  const token = useAppSelector(selectToken);
  const isAuthenticated = !!token

  useEffect(() => {
    if (token) {
      replace('home');
    } else {
      replace('auth');
    }
  }, [replace, token]);

  return isAuthenticated
}
