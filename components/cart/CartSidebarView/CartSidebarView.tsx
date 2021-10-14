import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import EmptyCart from '@components/cart/EmptyCart'
import Fade from '@mui/material/Fade'
import { LineItem } from '@framework/types/cart'
import CartSummary from '@components/cart/CartSummary'

const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI()
  const { data, isLoading, isEmpty } = useCart()

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
  const handleClose = () => closeSidebar()

  return (
    <SidebarLayout className={s.root} handleClose={handleClose}>
      {isEmpty && !isLoading ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex px-4 pt-4">
            <Text className="flex-1" variant="pageHeading">
              Моята количка
            </Text>
          </div>
          <div className="flex flex-col">
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
            <div className="flex-shrink-0 px-4 pt-24 lg:pt-10 sm:px-6">
              <CartSummary subTotal={subTotal} total={total} shipping={0} />
              <div className="flex flex-row justify-end">
                <div className="w-full md:w-md">
                  <Button href="/checkout" Component="a" width="100%">
                    Завършване на поръчката
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
