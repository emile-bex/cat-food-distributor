'use client'

import { useAuthRedirection } from './components/useAuthRedirection';
import { CircularProgress } from '@mui/material';

export default function IndexPage() {
  useAuthRedirection();
  return <CircularProgress />;
}
