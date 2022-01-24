import React, { FC } from 'react'
import Script from 'next/script'

export const GoogleAnalytics: FC = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-M0PQ202LG6"
      />
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M0PQ202LG6');
          `,
        }}
      />
    </>
  )
}
