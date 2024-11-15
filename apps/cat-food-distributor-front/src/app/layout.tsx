'use client'

import { StyledComponentsRegistry } from './registry';
import React from 'react';
import { StoreProvider } from '@cat-food-distributor/store-react';
import { dependencies } from '../adapters';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    <StoreProvider dependencies={dependencies}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </StoreProvider>
    </body>
    </html>
  );
}
