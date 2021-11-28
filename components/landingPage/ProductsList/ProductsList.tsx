import { FC, memo } from 'react'
import { Product } from '@framework/types/product'
import { ProductCard } from '@components/product'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Button } from '@components/ui'
import { useRouter } from 'next/router'

const numberOfProducts = 6

const ProductsList: FC<{ products: Product[] }> = memo(({ products }) => {
  const router = useRouter()

  return (
    <Container maxWidth="xl" className="md:px-12">
      <Grid container justifyContent="center" pb={3}>
        <Grid
          item
          py={{ xs: 3, sm: 4 }}
          className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
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
        </Grid>
        <Grid item>
          <Button
            size="slim"
            round
            variant="outlined"
            onClick={() => router.push('search')}
          >
            Разгледай останалите...
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
})

export default ProductsList
