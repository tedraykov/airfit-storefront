import React, { useEffect } from 'react'
import { CheckoutView } from '@components/checkout/CheckoutView/CheckoutView'
import { StrippedLayout } from '@components/common/Layout/Layout'
import { useRouter } from 'next/router'
import useCart from '@hooks/cart/useCart'

export default function Checkout() {
  const { cart, loading, isEmpty } = useCart()
  const router = useRouter()

  useEffect(() => {
    if ((!cart && !loading) || (isEmpty && !loading)) {
      router.push('/').then()
    }
  }, [cart, loading, router])

  return <CheckoutView />
}

Checkout.Layout = StrippedLayout
