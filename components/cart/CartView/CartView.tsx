import { FC } from 'react'
import { Button, Text } from '@components/ui'
import { Cart, LineItem } from '@framework/types/cart'
import { CartItem } from '@components/cart'
import usePrice from '@commerce/product/use-price'
import Close from '@mui/icons-material/Close'
import EmptyCart from '@components/cart/EmptyCart'
import CartSummary from '@components/cart/CartSummary'
import { Fade } from '@mui/material'

interface CartViewProps {
  isLoading: boolean
  isEmpty: boolean
  checkoutButton?: boolean
  data: Cart | null | undefined
  onClose?: () => void | undefined
}

export const CartView: FC<CartViewProps> = ({
  isLoading,
  isEmpty,
  checkoutButton = true,
  data,
  onClose = undefined,
}) => {
  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="flex px-4 pt-4">
        <Text className="flex-1" variant="pageHeading">
          Моята количка
        </Text>
        {!!onClose && <Close onClick={onClose} className="mt-1.5" />}
      </div>
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          {isEmpty && !isLoading ? (
            <EmptyCart />
          ) : (
            <div className="px-4 sm:px-6 flex-1">
              <Fade in={!isLoading}>
                <ul>
                  {data?.lineItems.map((item: LineItem) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      currencyCode={data?.currency.code!}
                    />
                  ))}
                </ul>
              </Fade>
            </div>
          )}
        </div>
        <div className="lg:col-span-4 lg:border-l border-accents-2">
          <div className="flex-shrink-0 px-4 pt-24 lg:pt-10 sm:px-6">
            <CartSummary subTotal={subTotal} total={total} shipping={0} />
            {checkoutButton && (
              <div className="flex flex-row justify-end">
                <div className="w-full md:w-md">
                  {isEmpty ? (
                    <Button href="/" Component="a" width="100%">
                      Продължи с пазаруването
                    </Button>
                  ) : (
                    <Button href="/checkout" Component="a" width="100%">
                      Завършване на поръчката
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
