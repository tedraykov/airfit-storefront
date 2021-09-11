import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import React, { useEffect } from 'react'
import { CheckoutView } from '@components/checkout/CheckoutView/CheckoutView'
import useCart from '@framework/cart/use-cart'
import { PaymentMethod } from '@framework/schema'
import { StrippedLayout } from '@components/common/Layout/Layout'
import getPaymentMethods from '@lib/reactioncommerce/utils/getPaymentMethods'
import { router } from 'next/client'
import { useRouter } from 'next/router'

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
  const { data, isLoading, isEmpty } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!data && !isLoading) {
      router.push('/')
    }
  }, [data])

  return isLoading || (!isLoading && !data) ? (
    <h1>Loading...</h1>
  ) : (
    <CheckoutView
      cart={data}
      isEmpty={isEmpty}
      isLoading={isLoading}
      paymentMethods={paymentMethods}
    />
  )
}

Checkout.Layout = StrippedLayout
