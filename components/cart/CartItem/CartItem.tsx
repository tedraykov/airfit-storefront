import { ChangeEvent, FC, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.scss'
import { Trash, Plus, Minus } from '@components/icons'
import useUI from '@hooks/useUI'
import { CartItem as MOCCartItem } from '@framework/schema'
import useCart from '@hooks/cart/useCart'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

interface CartItemProps {
  item: MOCCartItem
  variant?: 'normal' | 'slim'
}

const CartItem: FC<CartItemProps> = ({ item, variant = 'normal', ...rest }) => {
  const { closeSidebarIfPresent } = useUI()
  const [quantity, setQuantity] = useState(item.quantity)
  const { updateItem, removeItem } = useCart()
  const [removing, setRemoving] = useState(false)

  const updateQuantity = (val: number) => {
    return updateItem({
      cartItemId: item._id,
      quantity: val,
    })
  }

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(Number(e.target.value))
    }
  }

  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      return updateQuantity(val)
    }
  }

  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      return updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)
    await removeItem(item?._id).catch(() => setRemoving(false))
  }
  // TODO: Add a type for this
  const options = (item as any).options

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  const rootClassName = cn(s.root, {
    [s.slim]: variant === 'slim',
    ['opacity-75 pointer-events-none']: removing,
  })

  return (
    <li className={rootClassName} {...rest}>
      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-md bg-violet relative overflow-hidden cursor-pointer">
        <Link href={`/product/${item.productSlug}`} passHref={true}>
          <div className="h-full">
            <Image
              onClick={() => closeSidebarIfPresent()}
              className={s.productImage}
              layout="fill"
              src={item?.imageURLs?.thumbnail || '/product-img-placeholder.svg'}
              alt={'cart item'}
            />
          </div>
        </Link>
      </div>
      <div className="flex-1 flex flex-col text-base">
        <Link href={`/product/${item.productSlug}`}>
          <span className={s.title} onClick={() => closeSidebarIfPresent()}>
            {item.title}
          </span>
        </Link>
        {options && options.length > 0 ? (
          <div className="">
            {options.map((option: ItemOption, i: number) => (
              <span
                key={`${item._id}-${option.name}`}
                className="text-sm font-semibold text-accents-7"
              >
                {option.value}
                {i === options.length - 1 ? '' : ', '}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-center mt-3">
          <button type="button" onClick={() => increaseQuantity(-1)}>
            <Minus width={18} height={18} />
          </button>
          <label>
            <input
              type="number"
              max={99}
              min={0}
              className={s.quantity}
              value={quantity}
              onChange={handleQuantity}
              onBlur={handleBlur}
            />
          </label>
          <button type="button" onClick={() => increaseQuantity(1)}>
            <Plus width={18} height={18} />
          </button>
        </div>
      </div>
      <div className={s.price}>
        <span className="flex flex-col">
          {item?.compareAtPrice && (
            <span className="line-through text-accents-7">
              {item?.compareAtPrice.displayAmount}
            </span>
          )}
          <span>{item?.price.displayAmount}</span>
        </span>
        <button
          className="flex justify-end outline-none"
          onClick={handleRemove}
        >
          <Trash />
        </button>
      </div>
    </li>
  )
}

export default CartItem
