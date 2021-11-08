import { FC, useState } from 'react'
import s from './Slideshow.module.css'
import { Button } from '@components/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FeaturedProduct } from '@framework/types/page'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import cn from 'classnames'
import { generateGradient } from '@lib/colors'
import { useSwipeable } from 'react-swipeable'

interface SlideshowProps {
  products: FeaturedProduct[] | undefined
}

const Slideshow: FC<SlideshowProps> = ({ products }) => {
  if (!products) return null
  const [activeProduct, setActiveProduct] = useState<FeaturedProduct>(
    products[0]
  )
  const [activeProductIndex, setActiveProductIndex] = useState(
    activeProduct && 0
  )
  const router = useRouter()

  const handleSwipeLeft = () => {
    if (activeProductIndex === 0) {
      setActiveProduct(products[products.length - 1])
      setActiveProductIndex(products.length - 1)
      return
    }
    setActiveProduct(products[activeProductIndex - 1])
    setActiveProductIndex(activeProductIndex - 1)
  }

  const handleSwipeRight = () => {
    if (activeProductIndex === products.length - 1) {
      setActiveProduct(products[0])
      setActiveProductIndex(0)
      return
    }
    setActiveProduct(products[activeProductIndex + 1])
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
        [s.reversedText]: activeProduct.useReversedText,
      })}
      style={{ background: generateGradient(activeProduct.backgroundColor) }}
      {...handlers}
    >
      <div className="flex justify-between w-full px-4 pb-6 max-w-6xl">
        <Typography variant="h6" fontWeight="bold">
          Вникни в AIRFIT
        </Typography>
        <p>
          {activeProductIndex + 1} / {products.length}
        </p>
      </div>
      <div className={s.content}>
        <div className={s.productImage}>
          <Image
            layout="responsive"
            width={300}
            height={300}
            src={`https:${activeProduct.productImage}`}
            alt={activeProduct.title}
          />
        </div>
        <div className={s.textContent}>
          <Typography variant="h5" lineHeight="2">
            {activeProduct.title}
          </Typography>
          <p>{activeProduct.description}</p>
          <Button
            onClick={() => router.push(activeProduct.productUrl)}
            color="secondary"
            size="slim"
            round
            className={s.button}
          >
            {activeProduct.buttonText}
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default Slideshow
