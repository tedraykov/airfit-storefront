import React, { FC, useEffect, useState } from 'react'
import { Button, Container, Input, Logo, Text } from '@components/ui'
import SwipeableViews from 'react-swipeable-views'
import { ShippingAddress } from '@components/checkout/ShippingAddress/ShippingAddress'
import { PaymentView } from '@components/checkout/PaymentView/PaymentView'
import { Drawer, MobileStepper } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import s from './CheckoutView.module.scss'

export const CheckoutView: FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [readyToFinalize, setReadyToFinalize] = useState(false)
  const [cartOpened, setCartOpened] = useState(false)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleOpenCart = () => {
    setCartOpened(true)
  }

  const handleCloseCart = () => {
    setCartOpened(false)
  }

  useEffect(() => {
    activeStep === 2 ? setReadyToFinalize(true) : setReadyToFinalize(false)
  }, [activeStep])

  return (
    <Container className={s.root}>
      <div className={s.header}>
        <div className={s.logo}>
          <Logo reversedColor={true} />
        </div>
        <div className={s.gradientLine} />
      </div>
      <SwipeableViews className="flex-1" index={activeStep} disabled={true}>
        <div className="flex flex-1 flex-col space-y-4">
          <Text variant="pageHeading">🧑‍🚀 Данни за доставка</Text>
          <div className="flex flex-row space-x-3">
            <div className="flex-grow">
              <Input type="text" placeholder="Име" />
            </div>
            <div className="flex-grow">
              <Input type="text" placeholder="Фамилия" />
            </div>
          </div>
          <Input
            type="tel"
            placeholder="Телефонен номер"
            pattern="[0]{1}[0-9]{9}"
          />
          <Input type="email" placeholder="Емейл" />
        </div>
        <div>
          <Text variant="pageHeading">📦 Адрес за доставка</Text>
          <ShippingAddress />
        </div>
        <div>
          <Text variant="pageHeading">💵 Метод за плащане</Text>
          <PaymentView />
        </div>
      </SwipeableViews>
      <section className="my-6">
        <div className="border-t border-accents-2">
          <ul className="py-3">
            <li className="flex justify-between py-1">
              <span>Доставка</span>
              <span className="font-bold tracking-wide">БЕЗПЛАТНА</span>
            </li>
          </ul>
          <div className="flex justify-between border-t border-accents-2 py-3 font-bold mb-2">
            <span>Общо</span>
            <span>309.99 лв.</span>
          </div>
        </div>
        <Button
          className="w-full justify-between mb-12"
          variant="slim"
          color="secondary"
          onClick={handleOpenCart}
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
          readyToFinalize ? (
            <Button className="ml-4 mr-2" variant="slim">
              Завърши
            </Button>
          ) : (
            <Button
              className="ml-4 mr-2"
              variant="slim"
              onClick={handleNext}
              disabled={activeStep === 2}
            >
              Продължи
            </Button>
          )
        }
        backButton={
          <Button
            className="ml-2 mr-4"
            variant="slim"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Назад
          </Button>
        }
      />

      <Drawer
        anchor="bottom"
        open={cartOpened}
        onClose={handleCloseCart}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        Content
      </Drawer>
    </Container>
  )
}
