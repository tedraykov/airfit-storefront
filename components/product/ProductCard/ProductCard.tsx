import { FC } from 'react'
import cn from 'classnames'
import s from './ProductCard.module.scss'
import Image, { ImageProps } from 'next/image'
import Card from '@mui/material/Card'
import { CatalogProduct } from '@graphql/schema'
import usePrice from '@hooks/usePrice'
import Link, { LinkProps } from 'next/link'

type Props = {
  className?: string
  product: CatalogProduct
  imgProps?: Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL' | ''>
} & Omit<LinkProps, 'href'>

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({ className, product, imgProps, ...props }) => {
  const { price, discount } = usePrice({ product })

  return (
    <Link href={`/product/${product.slug}`} {...props}>
      <a className={s.root}>
        <Card elevation={0} className={cn('relative', className)}>
          <div className={s.squareBg} />
          <div className="flex flex-col items-start w-full pr-10 z-20 absolute">
            <h3 className={s.productTitle}>
              <span>{product.title}</span>
            </h3>
            <span className={s.productPrice}>{price}</span>
          </div>
          <div className={s.imageContainer}>
            {product?.primaryImage && (
              <Image
                alt={product.title || 'Product Image'}
                className={s.productImage}
                src={product.primaryImage.URLs?.medium || placeholderImg}
                height={480}
                width={480}
                placeholder={'blur'}
                blurDataURL={placeholderImg}
              />
            )}
          </div>
          {discount.maxDiscount > 0 && (
            <div className={s.productDiscount}>
              до -{discount.displayMaxDiscount}
            </div>
          )}
        </Card>
      </a>
    </Link>
  )
}

export default ProductCard
