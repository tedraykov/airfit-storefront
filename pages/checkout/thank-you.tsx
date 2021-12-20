import React, { useEffect } from 'react'
import { CheckoutHeader } from '@components/checkout/CheckoutView/CheckoutView'
import { StrippedLayout } from '@components/common/Layout/Layout'
import { SuccessCheck } from '@components/ui/SuccessCheck/SuccessCheck'
import { Button, Text } from '@components/ui'
import Link from '@components/ui/Link'
import { track } from '@lib/facebookPixel'

export default function ThankYou() {
  useEffect(() => {
    track('Lead')
  }, [])

  return (
    <>
      <CheckoutHeader />
      <div className="flex flex-col items-center mx-2 justify-center">
        <Text variant="pageHeading" className="mt-10 mb-4 text-center">
          Вашата поръчка беше приета успешно!
        </Text>
        <SuccessCheck />
        <Text className="pb-12">
          Ще се свържем с Вас за да потвърдим поръчката Ви.
        </Text>
        <Link href="/">
          <Button>Върни се към сайта</Button>
        </Link>
      </div>
    </>
  )
}

ThankYou.Layout = StrippedLayout
