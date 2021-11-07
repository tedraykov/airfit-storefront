import React, { FC, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Drawer from '@mui/material/Drawer'
import MobileStepper from '@mui/material/MobileStepper'
import Typography from '@mui/material/Typography'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { CartView } from '@components/cart/CartView/CartView'
import { Button, Container } from '@components/ui'
import CartSummary from '@components/cart/CartSummary'
import { Cart } from '@framework/types/cart'
import useStepper, { Step } from '@hooks/useStepper'
import s from './MobileCheckout.module.scss'

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
  steps: Step[]
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
  } = useStepper(steps)
  const { cartDrawerOpened, handleOpenCartDrawer, handleCloseCartDrawer } =
    useCartDrawer()

  return (
    <Container className="animated fadeIn">
      <SwipeableViews
        index={activeStep}
        disabled={true}
        className={s.swipeableViews}
      >
        {steps.map((step, index) => (
          <div key={index} className="h-auto">
            <Typography variant="h5" className="font-bold mb-4">
              {step.icon} {step.label}
            </Typography>
            {renderStepComponent(index)}
          </div>
        ))}
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
        steps={3}
        position="bottom"
        elevation={10}
        activeStep={activeStep}
        nextButton={
          <Button
            className="ml-4 mr-2"
            size="slim"
            loading={isActiveStepLoading}
            onClick={handleNext}
            disabled={!canContinueToNextStep()}
          >
            {!isLastStep() ? 'Продължи' : 'Завърши'}
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
    </Container>
  )
}

export default MobileCheckout
