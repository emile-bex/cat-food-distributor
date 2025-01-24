'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import React from 'react';
import { StoreProvider } from '@cat-food-distributor/shared/data-access/store';
import { dependencies } from '../adapters';
import { DialogsProvider } from '@toolpad/core/useDialogs';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    <AppRouterCacheProvider>
      <StoreProvider dependencies={dependencies}>
        <DialogsProvider>{children}</DialogsProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
