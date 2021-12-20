import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { useRouter } from 'next/router'
import { Metrics } from '@layer0/rum'
import { isProd } from '@config/environment'
import { FacebookPixel, pageView } from '@lib/facebookPixel'

const Noop: FC = ({ children }) => <>{children}</>

if (isProd()) {
  new Metrics({
    token: '259de392-2930-4776-8cff-4f6f5debb6d3',
  }).collect()
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const router = useRouter()

  useEffect(() => {
    pageView()

    const handleRouteChange = () => {
      pageView()
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
      <FacebookPixel />
      <Head>
        <title>Airfit | Спортно оборудване за дома</title>
      </Head>
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
