import { FC } from 'react'
import { Button, Text } from '@components/ui'
import { CartItem } from '@components/cart'
import Close from '@mui/icons-material/Close'
import EmptyCart from '@components/cart/EmptyCart'
import CartSummary from '@components/cart/CartSummary'
import Fade from '@mui/material/Fade'
import useCart from '@hooks/cart/useCart'

interface CartViewProps {
  checkoutButton?: boolean
  onClose?: () => void | undefined
}

export const CartView: FC<CartViewProps> = ({
  checkoutButton = true,
  onClose = undefined,
}) => {
  const { cart, loading } = useCart()
  const isEmpty = !loading && cart?.totalItemQuantity === 0

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
          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="px-4 sm:px-6 flex-1">
              <Fade in={!loading}>
                <ul>
                  {cart?.items?.nodes?.map((item) => (
                    <CartItem
                      canEdit={checkoutButton}
                      key={item!._id}
                      item={item!}
                    />
                  ))}
                </ul>
              </Fade>
            </div>
          )}
        </div>
        <div className="lg:col-span-4 lg:border-l border-accents-2">
          <div className="flex-shrink-0 px-4 pt-24 lg:pt-10 sm:px-6">
            <CartSummary cart={cart} />
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
