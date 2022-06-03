import type { FC } from 'react'
import { CatalogProduct } from '@graphql/schema'
import { ProductCard } from '@components/product'
import rangeMap from '@lib/range-map'
import { Skeleton } from '@components/ui'

type CatalogGridProps = {
  products: CatalogProduct[]
  loading: boolean
}

const CatalogGrid: FC<CatalogGridProps> = ({ products, loading }) => {
  const GridWrapper: FC = ({ children }) => {
    return (
      <div className="col-span-8 order-3 lg:order-none">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {children}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <GridWrapper>
        {rangeMap(4, (i) => (
          <Skeleton
            key={i}
            className="rounded-xl overflow-hidden w-full pt-[100%]"
          />
        ))}
      </GridWrapper>
    )
  }

  return (
    <GridWrapper>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          className="animated fadeIn shadow-lg"
          product={product}
          imgProps={{
            width: 480,
            height: 480,
          }}
        />
      ))}
    </GridWrapper>
  )
}

export default CatalogGrid
