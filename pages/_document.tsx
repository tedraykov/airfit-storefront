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
              content="c91a7faa696312cb0f167e6f92dcb682"
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
