import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import React, { useEffect } from 'react'
import { CheckoutView } from '@components/checkout/CheckoutView/CheckoutView'
import useCart from '@framework/cart/use-cart'
import { StrippedLayout } from '@components/common/Layout/Layout'
import useCheckoutCart from '@lib/reactioncommerce/cart/useCheckoutCart'

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
  return {
    props: { pages, categories },
  }
}

export default function Checkout() {
  const { data, isLoading, isEmpty } = useCart()
  const { cart: checkoutCart, mutationQueries } = useCheckoutCart()

  useEffect(() => {
    console.log('Checkout cart modified')
    console.log(checkoutCart)
  }, [checkoutCart])

  return (
    <CheckoutView
      mutationQueries={mutationQueries}
      cart={data}
      isEmpty={isEmpty}
      isLoading={isLoading}
    />
  )
}

Checkout.Layout = StrippedLayout
