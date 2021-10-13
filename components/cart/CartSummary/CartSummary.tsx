import { FC } from 'react'

interface CartSummaryProps {
  subTotal: string
  shipping: number
  total: string
}

const CartSummary: FC<CartSummaryProps> = ({ subTotal, shipping, total }) => {
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
export default CartSummary
