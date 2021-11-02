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
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'

const Noop: FC = ({ children }) => <>{children}</>

if (isProd()) {
  new Metrics({
    token: '259de392-2930-4776-8cff-4f6f5debb6d3',
  }).collect()
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const router = useRouter()
  const { acceptedCookies } = useAcceptCookies()

  useEffect(() => {
    if (isProd() && acceptedCookies) {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init('398867188563519') // facebookPixelId
          ReactPixel.pageView()

          router.events.on('routeChangeComplete', () => {
            ReactPixel.pageView()
            ReactPixel.track('ViewContent')
          })
        })
    }
  }, [router.events])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
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
