import { FC } from 'react'
import s from './Slideshow.module.css'
import { Button } from '@components/ui'
import { Product } from '@framework/types/product'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface SlideshowProps {
  products: Product[]
}

const Slideshow: FC<SlideshowProps> = ({ products }) => {
  const router = useRouter()

  return (
    <>
      <div className={s.section}>
        <div className={s.h3andp}>
          <h3>Вникни в AIRFIT</h3>
          <p>1 / 5</p>
        </div>
        <div className="w-full">
          <Image
            className={s.productImage}
            layout="responsive"
            width={500}
            height={500}
            src={products[7].images[0].url}
            alt={products[7].images[0].alt}
            unoptimized
          />
        </div>
        <div className={s.h4andp}>
          <h4 className={s.h4}>{products[7].name}</h4>
          <p>
            {products[7].description
              .replace('<p>', '')
              .split('.')
              .filter((_, index) => index < 2)}
            .
          </p>
        </div>
        <Button
          onClick={() => router.push(`product/${products[7].slug}`)}
          color="secondary"
          size="slim"
          round
          className={s.button}
        >
          Хмм...
        </Button>
      </div>
    </>
  )
}

export default Slideshow
