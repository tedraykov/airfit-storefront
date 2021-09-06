import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import React, { useEffect } from 'react'
import { CheckoutView } from '@components/checkout/CheckoutView/CheckoutView'
import useCart from '@framework/cart/use-cart'
import { PaymentMethod } from '@framework/schema'
import { StrippedLayout } from '@components/common/Layout/Layout'
import useCheckoutCart from '@lib/reactioncommerce/cart/useCheckoutCart'
import getPaymentMethods from '@lib/reactioncommerce/utils/getPaymentMethods'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const paymentMethods = await getPaymentMethods()
  return {
    props: { pages, categories, paymentMethods },
  }
}

export default function Checkout({
  paymentMethods,
}: {
  paymentMethods: PaymentMethod[]
}) {
  const { isLoading, isEmpty } = useCart()
  const { cart: data, mutationQueries } = useCheckoutCart()

  useEffect(() => {
    console.log('Checkout cart modified')
    console.log(data?.cart)
  }, [data])

  return !data ? (
    <h1>Loading...</h1>
  ) : (
    <CheckoutView
      mutationQueries={mutationQueries}
      cart={data.cart}
      isEmpty={isEmpty}
      isLoading={isLoading}
      paymentMethods={paymentMethods}
    />
  )
}

Checkout.Layout = StrippedLayout
