import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { isProd } from '@config/environment'
import createEmotionCache from '@lib/emotion/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" />
          {isProd() && (
            <meta
              name="verify-paysera"
              content="b2b92766c5fcbbbe8438e8ce92d9375b"
            />
          )}
          <link
            rel="preload"
            href="/fonts/Inter.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  }
}

export default MyDocument
