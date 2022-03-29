import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import React, { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { useRouter } from 'next/router'
import { FacebookPixel, pageView } from '@lib/facebookPixel'
import * as ga from '@lib/googleAnalytics'
import { UIProvider } from '@context/UIContext'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@theme/index'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { GRAPHQL_URL } from '@config/index'
import { CartProvider } from '@context/CartContext'
import { isProd } from '@config/environment'
import GoogleAnalytics from '@lib/googleAnalytics/GoogleAnalytics'

const Noop: FC = ({ children }) => <>{children}</>

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const router = useRouter()

  useEffect(() => {
    if (isProd()) {
      pageView()
    }

    const handleRouteChange = (url: string) => {
      if (isProd()) {
        pageView()
        // @ts-ignore
        ga.pageview(url)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      {isProd() && (
        <>
          {() => console.log('running in production')}
          <GoogleAnalytics />
          <FacebookPixel />
        </>
      )}
      <Head>
        <title>Airfit | Спортно оборудване за дома</title>
      </Head>
      <UIProvider>
        <ApolloProvider client={client}>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </CartProvider>
        </ApolloProvider>
      </UIProvider>
    </>
  )
}
