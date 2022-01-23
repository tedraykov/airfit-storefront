import React, { useEffect } from 'react'
import { CheckoutView } from '@components/checkout/CheckoutView/CheckoutView'
import useCart from '@framework/cart/use-cart'
import { StrippedLayout } from '@components/common/Layout/Layout'
import { useRouter } from 'next/router'

export default function Checkout() {
  const { data, isLoading, isEmpty } = useCart({ isCheckout: true })
  const router = useRouter()

  useEffect(() => {
    if (!data && !isLoading) {
      router.push('/')
    }
  }, [data, isLoading, router])

  return <CheckoutView cart={data} isEmpty={isEmpty} isLoading={isLoading} />
}

Checkout.Layout = StrippedLayout
