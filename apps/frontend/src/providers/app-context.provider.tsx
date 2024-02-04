import type { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ThemeProvider from '@/assets/theme/ThemeProvider';

import { AlertContextProvider } from '@/common/alert';
import { AuthContextProvider } from '@/auth';
import { ChildrenElementType } from '@/common/types/children-element.types';
import { i18n } from '../i18n';
import { queryClient } from '../common/query-client';

export const AppContextProvider: FC<ChildrenElementType> = ({ children }) => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AlertContextProvider>
          <AuthContextProvider>
            <I18nextProvider i18n={i18n}>

              <ThemeProvider>
                {children}
              </ThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />

            </I18nextProvider>
          </AuthContextProvider>
        </AlertContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);
