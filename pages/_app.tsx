import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from "next-themes"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OperationStatusProvider } from '@/src/context/OperationStatus';
import { GlobalUserDataProvider } from '@/src/context/GlobalUserDataContext';
import { UserSessionProvider } from '@/src/context/UserSession';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 10 * 1000,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false
      }
    }
  }))[0];

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalUserDataProvider>
        <OperationStatusProvider>
          <GoogleOAuthProvider clientId={"878393888095-17e41jvd6k0i8a0nq4jih895otq0meqr.apps.googleusercontent.com"}>
            <UserSessionProvider>
              <ThemeProvider attribute="class">
                <Component {...pageProps} />
              </ThemeProvider>
            </UserSessionProvider>
          </GoogleOAuthProvider>
        </OperationStatusProvider>
      </GlobalUserDataProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>)
}
