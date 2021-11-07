import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { mediaStyles } from '@components/common/MediaQueries'
import { isProd } from '@config/environment'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          {isProd() && (
            <meta
              name="verify-paysera"
              content="b2b92766c5fcbbbe8438e8ce92d9375b"
            />
          )}
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;600;700&display=swap"
            rel="stylesheet"
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

export default MyDocument
