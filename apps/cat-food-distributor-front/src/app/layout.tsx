'use client';

import { StyledComponentsRegistry } from './registry';
import React from 'react';
import { StoreProvider } from '@cat-food-distributor/shared/data-access/store';
import { dependencies } from '../adapters';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    <StyledComponentsRegistry>
      <StoreProvider dependencies={dependencies}>
        {children}
      </StoreProvider>
    </StyledComponentsRegistry>
    </body>
    </html>
  );
}
