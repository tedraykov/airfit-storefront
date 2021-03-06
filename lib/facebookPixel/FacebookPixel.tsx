import React, { FC } from 'react'
import Script from 'next/script'
import { isProd } from '@config/environment'

export const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

if (FACEBOOK_PIXEL_ID === undefined) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_FACEBOOK_PIXEL_ID is missing and it's required to access your store`
  )
}

type StandardEvents =
  | 'Lead'
  | 'InitiateCheckout'
  | 'AddToCart'
  | 'Purchase'
  | 'ViewContent'

export const pageView = () => {
  if (isProd()) {
    // @ts-ignore
    window.fbq('track', 'PageView')
  }
}

export const track = (name: StandardEvents, options = {}) => {
  if (isProd()) {
    // @ts-ignore
    window.fbq('track', name, options)
  }
}

export const FacebookPixel: FC = () => {
  if (!isProd()) return null

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${FACEBOOK_PIXEL_ID});
          `,
      }}
    />
  )
}
