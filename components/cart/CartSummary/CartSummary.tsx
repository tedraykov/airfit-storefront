import { FC, memo, useState } from 'react'
import { Cart } from '@framework/types/cart'
import usePrice from '@commerce/product/use-price'

interface CartSummaryProps {
  cart: Cart | null | undefined
}

const CartSummary: FC<CartSummaryProps> = ({ cart }) => {
  const { price: subTotal } = usePrice(
    cart && {
      amount: Number(cart.subtotalPrice),
      currencyCode: cart.currency.code,
    }
  )
  const { price: total } = usePrice(
    cart && {
      amount: Number(cart.totalPrice),
      currencyCode: cart.currency.code,
    }
  )

  const [shipping] = useState(0)

  return (
    <div>
      <ul className="py-3">
        <li className="flex justify-between py-1">
          <span>Междинна сума</span>
          <span>{subTotal}</span>
        </li>
        <li className="flex justify-between py-1">
          <span>Доставка</span>
          <span className="font-bold tracking-wide">
            {shipping === 0 ? 'БЕЗПЛАТНА' : shipping}
          </span>
        </li>
      </ul>
      <div className="flex justify-between border-t border-accents-2 py-3 font-bold mb-10">
        <span>Общо</span>
        <span>{total}</span>
      </div>
    </div>
  )
}
export default memo(CartSummary)
