import React, { FC } from 'react'
import useCheckout, { CheckoutStep } from '@hooks/useCheckout'
import { Cart, LineItem } from '@framework/types/cart'
import Fade from '@mui/material/Fade'
import CartItem from '../../cart/CartItem'
import CartSummary from '@components/cart/CartSummary/CartSummary'
import Link from 'next/link'
import { Button, Container } from '@components/ui'
import Card from '@mui/material/Card'
import { CardContent } from '@mui/material'

interface DesktopCheckoutProps {
  cart: Cart
  steps: CheckoutStep[]
  isLoading: boolean
}

const DesktopCheckout: FC<DesktopCheckoutProps> = ({
  cart,
  steps,
  isLoading,
}) => {
  const {} = useCheckout(steps)
  return (
    <Container className="flex flex-1">
      <section className="flex-1">test</section>
      <aside>
        <Card className="max-w-sm bg-accents-0 shadow-lg" elevation={0}>
          <CardContent>
            <div className="flex flex-col">
              <div className="px-4 sm:px-6 flex-1">
                <Fade in={!isLoading}>
                  <ul>
                    {cart?.lineItems.map((item: LineItem) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        currencyCode={cart?.currency.code!}
                      />
                    ))}
                  </ul>
                </Fade>
              </div>
              <div className="flex-shrink-0 px-4 pt-24 lg:pt-10 sm:px-6">
                <CartSummary cart={cart} />
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </Container>
  )
}

export default DesktopCheckout
