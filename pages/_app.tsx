import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from "next-themes"
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 10 * 1000
      },
      mutations: {
        retry: false
      }
    }
  }))[0];

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${roboto.className}`}>
        <ThemeProvider attribute="class">
                  <Component {...pageProps} />
        </ThemeProvider>
      </main>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>)
}