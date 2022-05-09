import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

import getAllProductPaths from '@framework/product/get-all-product-paths'
import commerce from '@lib/api/commerce'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const productPromise = commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const { product } = await productPromise

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
      categories,
    },
    revalidate: 60 * 30,
  }
}

export async function getStaticPaths() {
  const { products } = await getAllProductPaths()

  return {
    paths: products.map((product) => `/product${product.node.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ProductView product={product} />
}

Slug.Layout = Layout
