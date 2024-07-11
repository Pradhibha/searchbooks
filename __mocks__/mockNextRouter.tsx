// __mocks__/mockNextRouter.tsx
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { NextRouter } from 'next/router';
import { ReactNode } from 'react';
import React from 'react';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    ...router,
  };
}

export function withMockedRouter(children: ReactNode, router: Partial<NextRouter> = {}) {
  const mockRouter = createMockRouter(router);
  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  );
}
