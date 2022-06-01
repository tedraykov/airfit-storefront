import type { FC } from 'react'
import { NextSeo } from 'next-seo'
import React from 'react'
import { CatalogProduct } from '@graphql/schema'

type ProductSeoProps = {
  product: CatalogProduct
}

const ProductSeo: FC<ProductSeoProps> = ({ product }) => {
  return (
    <NextSeo
      title={product.title}
      description={product.description}
      openGraph={{
        type: 'website',
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.media[0]?.URLs?.small,
            width: 600,
            height: 600,
            alt: product.title,
          },
        ],
      }}
    />
  )
}

export default ProductSeo
