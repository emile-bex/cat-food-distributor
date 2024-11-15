'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { AppStore } from './types';
import { AppDependencies } from './dependencies';

export const StoreProvider = ({ children, dependencies }: {
  children: React.ReactNode,
  dependencies: AppDependencies
}) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore(dependencies);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
