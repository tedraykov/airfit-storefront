import { FC, memo, useMemo } from 'react'
import HelpIcon from '@mui/icons-material/Help'
import { Tooltip } from '@mui/material'
import { Cart } from '@graphql/schema'

interface CartSummaryProps {
  cart: Cart | undefined
}

const CartSummary: FC<CartSummaryProps> = ({ cart }) => {
  const { shippingTotal, discountTotal, itemTotal, total, isAddressSet } =
    useMemo(() => {
      const checkout = cart?.checkout
      const summary = checkout?.summary
      return {
        shippingTotal: summary?.fulfillmentTotal,
        discountTotal: summary?.discountTotal,
        itemTotal: summary?.itemTotal,
        total: summary?.total,
        isAddressSet: Boolean(
          checkout?.fulfillmentGroups[0]?.selectedFulfillmentOption
        ),
      }
    }, [cart])

  const displayShippingPrice = useMemo(() => {
    if (!isAddressSet) {
      return '-'
    }

    if (shippingTotal?.amount === 0) {
      return 'БЕЗПЛАТНА'
    }
    return shippingTotal?.displayAmount
  }, [isAddressSet, shippingTotal])

  return (
    <div>
      <ul className="py-3">
        <li className="flex justify-between py-1">
          <span>Междинна сума</span>
          <span>{itemTotal?.displayAmount}</span>
        </li>
        {discountTotal?.amount !== 0 && (
          <li className="flex justify-between py-1">
            <span>Отсъпка</span>
            <span>{cart?.checkout?.summary?.discountTotal.displayAmount}</span>
          </li>
        )}
        <li className="flex justify-between gap-1 py-1">
          <span className="flex-1">Доставка</span>
          <span className="font-bold tracking-wide">
            {displayShippingPrice}
          </span>
          {!isAddressSet && (
            <Tooltip title="Цената за доставка ще бъде калкулирана след въвеждане на адрес за доставка.">
              <HelpIcon color="info" />
            </Tooltip>
          )}
        </li>
      </ul>
      <div className="flex justify-between border-t border-accents-2 py-3 font-bold mb-10">
        <span>Общо</span>
        <span>{total?.displayAmount}</span>
      </div>
    </div>
  )
}
export default memo(CartSummary)
