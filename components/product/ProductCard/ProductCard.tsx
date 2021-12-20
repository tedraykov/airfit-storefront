import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import s from './ProductCard.module.scss'
import Image, { ImageProps } from 'next/image'
import usePrice from '@commerce/product/use-price'
import { Product } from '@framework/types/product'
import Card from '@mui/material/Card'

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
      <a className={cn(s.root, { [s.simple]: variant === 'simple' })}>
        {variant === 'slim' ? (
          <SlimProductCard product={product} />
        ) : (
          <SimpleProductCard
            product={product}
            price={price}
            className={className}
          />
        )}
      </a>
    </Link>
  )
}

const SimpleProductCard: FC<{
  product: Product
  price: string
  className?: string
}> = ({ product, price, className }) => {
  return (
    <Card elevation={0} className={cn('relative', className)}>
      <div className={s.squareBg} />
      <div className="flex flex-col items-start w-full pr-10 z-20 absolute">
        <h3 className={s.productTitle}>
          <span>{product.name}</span>
        </h3>
        <span className={s.productPrice}>{price}</span>
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
            blurDataURL={placeholderImg}
          />
        )}
      </div>
      {product.price.maxDiscount !== '0%' && (
        <div className={s.productDiscount}>до -{product.price.maxDiscount}</div>
      )}
    </Card>
  )
}

const SlimProductCard: FC<{ product: Product }> = ({ product }) => {
  return (
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
  )
}

export default ProductCard
