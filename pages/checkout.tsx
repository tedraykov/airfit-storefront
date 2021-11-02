import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import React, { useEffect } from 'react'
import { CheckoutView } from '@components/checkout/CheckoutView/CheckoutView'
import useCart from '@framework/cart/use-cart'
import { StrippedLayout } from '@components/common/Layout/Layout'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'

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
  const { data, isLoading, isEmpty } = useCart({ isCheckout: true })
  const router = useRouter()

  useEffect(() => {
    if (!data && !isLoading) {
      router.push('/')
    }
  }, [data])

  return <CheckoutView cart={data} isEmpty={isEmpty} isLoading={isLoading} />
}

Checkout.Layout = StrippedLayout
