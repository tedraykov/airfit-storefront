import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import React from 'react'
import { CheckoutView } from '@components/checkout/CheckoutView/CheckoutView'

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

export default function Cart() {
  return <CheckoutView />
}
