import { FC, memo } from 'react'
import { Product } from '@framework/types/product'
import { ProductCard } from '@components/product'
import { Button } from '@components/ui'
import { useRouter } from 'next/router'

const numberOfProducts = 6

const ProductsList: FC<{ products: Product[] }> = memo(({ products }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-screen-2xl px-6 md:px-12 py-10 space-y-10">
      <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {products.slice(0, numberOfProducts).map((product: Product) => (
          <ProductCard
            key={product.path}
            variant="simple"
            className="animated fadeIn shadow-lg"
            product={product}
            imgProps={{
              width: 480,
              height: 480,
            }}
          />
        ))}
      </div>
      <Button
        className="w-max"
        size="slim"
        round
        variant="outlined"
        onClick={() => router.push('search')}
      >
        Разгледай останалите...
      </Button>
    </div>
  )
})

ProductsList.displayName = 'ProductsList'

export default ProductsList
