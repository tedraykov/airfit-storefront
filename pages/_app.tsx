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
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@lib/emotion/createEmotionCache'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const Noop: FC = ({ children }) => <>{children}</>

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const clientSideEmotionCache = createEmotionCache()

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const Layout = (Component as any).Layout || Noop
  const router = useRouter()
  useEffect(() => {
    pageView()

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
      <GoogleAnalytics />
      <FacebookPixel />
      <Head>
        <title>Airfit | Спортно оборудване за дома</title>
      </Head>
      <ApolloProvider client={client}>
        <CartProvider>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <UIProvider>
                <Layout pageProps={pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </UIProvider>
            </ThemeProvider>
          </CacheProvider>
        </CartProvider>
      </ApolloProvider>
    </>
  )
}
