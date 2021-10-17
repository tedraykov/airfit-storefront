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
    <Container maxWidth="xl">
      <Grid container justifyContent="center" pb={3}>
        <Grid item container rowSpacing={3} columnSpacing={3} py={3}>
          {products.slice(0, numberOfProducts).map((product: Product) => (
            <Grid item xs={12} md={6} key={product.path}>
              <ProductCard
                variant="simple"
                className="animated fadeIn"
                product={product}
                imgProps={{
                  width: 480,
                  height: 480,
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Button
            size="slim"
            round
            color="secondary"
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
