import React, { FC, useState } from 'react'
import MobileStepper from '@mui/material/MobileStepper'
import { Button } from '@components/ui'
import Drawer from '@mui/material/Drawer'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import s from '@components/checkout/CheckoutView/CheckoutView.module.scss'
import { CartView } from '@components/cart/CartView/CartView'
import { Cart } from '@framework/types/cart'
import SwipeableViews from 'react-swipeable-views'
import CartSummary from '@components/cart/CartSummary'
import useCheckout, { CheckoutStep } from '@hooks/useCheckout'

const useCartDrawer = () => {
  const [cartDrawerOpened, setCartDrawerOpened] = useState(false)

  const handleOpenCartDrawer = () => {
    setCartDrawerOpened(true)
  }

  const handleCloseCartDrawer = () => {
    setCartDrawerOpened(false)
  }

  return {
    cartDrawerOpened,
    handleOpenCartDrawer,
    handleCloseCartDrawer,
  }
}

type MobileCheckoutProps = {
  cart: Cart
  isLoading: boolean
  isEmpty: boolean
  steps: CheckoutStep[]
}

const MobileCheckout: FC<MobileCheckoutProps> = ({
  cart,
  isLoading,
  isEmpty,
  steps,
}) => {
  const {
    activeStep,
    handleBack,
    handleNext,
    isLastStep,
    isActiveStepLoading,
    canContinueToNextStep,
    renderStepComponent,
  } = useCheckout(steps)
  const { cartDrawerOpened, handleOpenCartDrawer, handleCloseCartDrawer } =
    useCartDrawer()

  return (
    <>
      <SwipeableViews
        className="flex-1"
        index={activeStep}
        disabled={true}
        animateHeight={true}
      >
        {steps.map((_, index) => renderStepComponent(index, { key: index }))}
      </SwipeableViews>
      <section className="my-6">
        <CartSummary cart={cart} />
        <Button
          className="w-full justify-between mb-12"
          size="slim"
          color="secondary"
          onClick={handleOpenCartDrawer}
        >
          <span className="flex-1 font-light">🛒 Преглед на количката</span>
          <ExpandLessIcon />
        </Button>
      </section>
      <MobileStepper
        variant="progress"
        steps={4}
        position="bottom"
        elevation={10}
        activeStep={activeStep}
        nextButton={
          <Button
            className="ml-4 mr-2"
            size="slim"
            loading={isActiveStepLoading}
            onClick={handleNext}
            disabled={canContinueToNextStep()}
          >
            {!isLastStep ? 'Продължи' : 'Завърши'}
          </Button>
        }
        backButton={
          <Button
            className="ml-2 mr-4"
            size="slim"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Назад
          </Button>
        }
      />

      <Drawer
        anchor="bottom"
        open={cartDrawerOpened}
        onClose={handleCloseCartDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div className={s.cartDrawerContent}>
          <CartView
            data={cart}
            isEmpty={isEmpty}
            isLoading={isLoading}
            checkoutButton={false}
            onClose={handleCloseCartDrawer}
          />
        </div>
      </Drawer>
    </>
  )
}

export default MobileCheckout
