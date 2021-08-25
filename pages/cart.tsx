import type { GetStaticPropsContext } from 'next'
import useCart from '@framework/cart/use-cart'
import { Layout } from '@components/common'
import commerce from '@lib/api/commerce'
import { CartView } from '@components/cart/CartView/CartView'

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
  const error = null
  const success = null
  const { data, isLoading, isEmpty } = useCart()

  return (
    <CartView
      isEmpty={isEmpty}
      isLoading={isLoading}
      error={error}
      success={success}
      data={data}
    />
  )
}

Cart.Layout = Layout
