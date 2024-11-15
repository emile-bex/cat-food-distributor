import { StyledComponentsRegistry } from './registry';
import React from 'react';
import { StoreProvider } from '../use-cases/StoreProvider';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    <StoreProvider>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </StoreProvider>
    </body>
    </html>
  );
}
