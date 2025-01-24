'use client'

import { CircularProgress, Container } from '@mui/material';
import { SpinnerContainer } from './Spinner.styles';

export function Spinner() {
  return <SpinnerContainer><CircularProgress /></SpinnerContainer>;
}
