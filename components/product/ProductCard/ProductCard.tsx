import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import s from './ProductCard.module.scss'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@commerce/product/use-price'
import { Product } from '@framework/types/product'

interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
  imgProps?: Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL' | ''>
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  className,
  product,
  variant,
  imgProps,
  ...props
}) => {
  const { price } = usePrice({
    amountRange: {
      min: product.price.minPrice,
      max: product.price.maxPrice,
    },
    currencyCode: product.price.currencyCode!,
  })

  return (
    <Link href={`/product/${product.slug}`} {...props}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        {variant === 'slim' ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {product.name}
              </span>
            </div>
            {product?.images && (
              <Image
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || 'Product Image'}
                unoptimized={true}
                width={540}
                height={540}
                layout="fixed"
                placeholder={'blur'}
                blurDataURL={product.images[0]?.thumbnail || placeholderImg}
              />
            )}
          </div>
        ) : (
          <>
            <div className={s.squareBg} />
            <div className="flex flex-row justify-between box-border w-full z-20 absolute">
              <div className="absolute top-0 left-0 pr-16 max-w-full">
                <h3 className={s.productTitle}>
                  <span>{product.name}</span>
                </h3>
                <span className={s.productPrice}>{price}</span>
              </div>
              {process.env.COMMERCE_WISHLIST_ENABLED && (
                <WishlistButton
                  className={s.wishlistButton}
                  productId={product.id}
                  variant={product.variants[0] as any}
                />
              )}
            </div>
            <div className={s.imageContainer}>
              {product?.images && (
                <Image
                  alt={product.name || 'Product Image'}
                  className={s.productImage}
                  src={product.images[0]?.large || placeholderImg}
                  height={640}
                  width={640}
                  unoptimized={true}
                  layout="responsive"
                  placeholder={'blur'}
                  blurDataURL={product.images[0]?.thumbnail || placeholderImg}
                />
              )}
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
