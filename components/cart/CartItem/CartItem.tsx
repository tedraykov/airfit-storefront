import { ChangeEvent, FC, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.scss'
import { Trash, Plus, Minus } from '@components/icons'
import { useUI } from '@components/ui/context'
import usePrice from '@framework/product/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import { LineItem } from '@framework/types/cart'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

interface CartItemProps {
  item: LineItem
  currencyCode: string
  variant?: 'normal' | 'slim'
}

const CartItem: FC<CartItemProps> = ({
  item,
  currencyCode,
  variant = 'normal',
  ...rest
}) => {
  const { closeSidebarIfPresent } = useUI()
  // @ts-ignore
  const { price, basePrice } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  })

  const updateItem = useUpdateItem({ item })
  const removeItem = useRemoveItem()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)

  const updateQuantity = async (val: number) => {
    await updateItem({ quantity: val })
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
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item)
    } catch (error) {
      setRemoving(false)
    }
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
        <Link href={`/product/${item.path}`}>
          <div>
            <Image
              onClick={() => closeSidebarIfPresent()}
              className={s.productImage}
              layout="fill"
              src={item.variant.image!.url}
              alt={item.variant.image!.altText}
              unoptimized
            />
          </div>
        </Link>
      </div>
      <div className="flex-1 flex flex-col text-base">
        <Link href={`/product/${item.path}`}>
          <span className={s.title} onClick={() => closeSidebarIfPresent()}>
            {item.name}
          </span>
        </Link>
        {options && options.length > 0 ? (
          <div className="">
            {options.map((option: ItemOption, i: number) => (
              <span
                key={`${item.id}-${option.name}`}
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
          {basePrice && (
            <span className="line-through text-accents-7">{basePrice}</span>
          )}
          <span>{price}</span>
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
