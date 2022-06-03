import { FC, useState } from 'react'
import s from './Slideshow.module.scss'
import { Button } from '@components/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import { Box, Fade } from '@mui/material'
import cn from 'classnames'
import { useSwipeable } from 'react-swipeable'
import { IFeaturedProduct } from '@lib/contentful/schema'

interface SlideshowProps {
  products: IFeaturedProduct[]
}

const Slideshow: FC<SlideshowProps> = ({ products }) => {
  const [activeProduct, setActiveProduct] = useState<IFeaturedProduct>({
    ...products[0],
  })
  const [activeProductIndex, setActiveProductIndex] = useState(
    activeProduct && 0
  )

  const handleSwipeLeft = () => {
    if (activeProductIndex === 0) {
      setActiveProduct({ ...products[products.length - 1] })
      setActiveProductIndex(products.length - 1)
      return
    }
    setActiveProduct({ ...products[activeProductIndex - 1] })
    setActiveProductIndex(activeProductIndex - 1)
  }

  const handleSwipeRight = () => {
    if (activeProductIndex === products.length - 1) {
      setActiveProduct({ ...products[0] })
      setActiveProductIndex(0)
      return
    }
    setActiveProduct({ ...products[activeProductIndex + 1] })
    setActiveProductIndex(activeProductIndex + 1)
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  })

  if (!activeProduct) return null

  return (
    <Box
      className={cn(s.section, {
        [s.reversedText]: activeProduct.fields.useReversedText,
      })}
      style={{ background: activeProduct.fields.backgroundColor }}
      {...handlers}
    >
      <div className="flex justify-between w-full px-4 pb-6 max-w-6xl">
        <Typography variant="h5" fontWeight="bold">
          Вникни в AIRFIT
        </Typography>
        <div className="flex items-center text-xl">
          <Button
            variant="text"
            size="icon"
            color="secondary"
            onClick={handleSwipeLeft}
          >
            &lt;
          </Button>
          <p>
            {activeProductIndex + 1} / {products.length}
          </p>
          <Button
            size="icon"
            variant="text"
            color="secondary"
            onClick={handleSwipeRight}
          >
            &gt;
          </Button>
        </div>
      </div>
      <Slide product={activeProduct} />
    </Box>
  )
}

const Slide = ({ product }: { product: IFeaturedProduct }) => {
  return (
    <div key={product.fields.productUrl} className={cn(s.content)}>
      <Fade in timeout={{ enter: 500 }}>
        <div className={s.productImage}>
          <Image
            layout="responsive"
            width={500}
            height={500}
            src={`https:${product.fields.productImage.fields.file.url}`}
            alt={product.fields.title}
            placeholder={'blur'}
            blurDataURL={`https:${product.fields.productImage}?h=10`}
          />
        </div>
      </Fade>
      <div className={s.textContent}>
        <Fade in timeout={{ enter: 500 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {product.fields.title}
          </Typography>
        </Fade>
        <Fade in timeout={{ enter: 500 }} style={{ transitionDelay: '100ms' }}>
          <Typography className="xl:text-lg">
            {product.fields.shortDecription}
          </Typography>
        </Fade>
        <Fade in timeout={{ enter: 500 }} style={{ transitionDelay: '200ms' }}>
          <Button
            component="a"
            href={`/product/${product.fields.slug}`}
            variant="outlined"
            size="slim"
            color="secondary"
            round
            className="mt-4"
          >
            {product.fields.buttonText}
          </Button>
        </Fade>
      </div>
    </div>
  )
}

export default Slideshow
