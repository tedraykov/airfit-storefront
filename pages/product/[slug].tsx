import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

import { track } from '@lib/facebookPixel'
import getCatalogProduct from '@server/operations/getCatalogProduct'
import commonStaticProps from '@utils/static/commonStaticProps'
import { useEffect } from 'react'
import getCatalogProductPaths from '@server/operations/getCatalogProductPaths'

export async function getStaticProps({
  params,
  ...ctx
}: GetStaticPropsContext<{ slug: string }>) {
  const commonProps = await commonStaticProps(ctx)
  const product = await getCatalogProduct(params!.slug)
  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...commonProps,
      product,
    },
    revalidate: 60 * 30,
  }
}

export async function getStaticPaths() {
  const products = await getCatalogProductPaths()

  return {
    paths: products.map((product) => `/product/${product.slug}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    track('ViewContent', {
      content_type: 'product',
      content_ids: [product?.slug],
      value: product?.pricing[0].minPrice,
      currency: product?.pricing[0].currency.code,
    })
  }, [product?.slug, product.pricing])

  return <ProductView product={product} />
}

Slug.Layout = Layout
