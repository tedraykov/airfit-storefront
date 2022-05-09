import type { FC } from 'react'
import { isProd } from '@config/environment'
import Script from 'next/script'

type KlaviyoSignupProps = {}

const KlaviyoSignup: FC<KlaviyoSignupProps> = () => {
  if (!isProd()) return null

  return (
    <Script
      id="klaviyo-signup"
      async
      type="text/javascript"
      src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=ReJ3p8"
    />
  )
}

export default KlaviyoSignup
