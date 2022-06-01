import React, { FC, useMemo } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import useUI from '@hooks/useUI'
import SidebarLayout from '@components/common/SidebarLayout'
import EmptyCart from '@components/cart/EmptyCart'
import Fade from '@mui/material/Fade'
import CartSummary from '@components/cart/CartSummary'
import Link from 'next/link'
import useCart from '@hooks/cart/useCart'

const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI()
  const { cart, loading } = useCart()
  const isEmpty = !loading && cart?.totalItemQuantity === 0

  const handleClose = () => closeSidebar()

  return (
    <SidebarLayout className={s.root} handleClose={handleClose}>
      {isEmpty || (!loading && !cart) ? (
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
              <Fade in={!loading}>
                <ul>
                  {cart?.items?.nodes?.map((item) => (
                    <CartItem key={item!._id} item={item!} />
                  ))}
                </ul>
              </Fade>
            </div>
            <div className="flex-shrink-0 px-4 pb-4 pt-24 lg:pt-10 sm:px-6">
              <CartSummary cart={cart} />
              <div className="flex flex-row justify-end">
                <Link href="/checkout" passHref>
                  <Button className="w-full" onClick={handleClose}>
                    Завършви поръчката
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
