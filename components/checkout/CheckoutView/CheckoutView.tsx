import React, { FC, useEffect, useState } from 'react'
import { Button, Container, Input, Logo, Text } from '@components/ui'
import SwipeableViews from 'react-swipeable-views'
import { ShippingAddressForm } from '@components/checkout/ShippingAddressForm/ShippingAddressForm'
import { PaymentForm } from '@components/checkout/PaymentForm/PaymentForm'
import { Drawer, MobileStepper } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import s from './CheckoutView.module.scss'
import { CartView } from '@components/cart/CartView/CartView'
import { Cart } from '@framework/types/cart'
import { FieldErrors, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UseFormRegister } from 'react-hook-form/dist/types/form'

interface CheckoutViewProps {
  cart: Cart | null | undefined
  isLoading: boolean
  isEmpty: boolean
}

interface UserDataFieldValues {
  firstName: string
  sureName: string
  phone: number
  email: string
}

export interface ShippingAddressFieldValues {
  address: string
  locality: string
  postalCode: string
}

const userDataFormSchema = yup.object().shape({
  firstName: yup.string().required('Задължително поле'),
  sureName: yup.string().required('Задължително поле'),
  phone: yup.number().required('Задължително поле'),
  email: yup
    .string()
    .email('Въведете валиден мейл')
    .required('Задължително поле'),
})

export const CheckoutView: FC<CheckoutViewProps> = ({
  cart,
  isLoading,
  isEmpty,
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [readyToFinalize, setReadyToFinalize] = useState(false)
  const [cartOpened, setCartOpened] = useState(false)
  const {
    register: userDataRegister,
    formState: { errors: userDataErrors, isValid: userDataIsValid },
  } = useForm<UserDataFieldValues>({
    resolver: yupResolver(userDataFormSchema),
    mode: 'all',
  })

  const {
    register: shippingAddressRegister,
    setValue: shippingAddressSetValue,
    formState: {
      errors: shippingAddressErrors,
      isValid: shippingAddressIsValid,
    },
  } = useForm<ShippingAddressFieldValues>()

  const {} = useForm({})
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

  const canContinueNextStep = (pageIndex: number): boolean => {
    switch (pageIndex) {
      case 0:
        return userDataIsValid
      case 1:
        return shippingAddressIsValid
    }
    return false
  }

  return (
    <Container className={s.root}>
      <div className={s.header}>
        <div className={s.logo}>
          <Logo reversedColor={true} />
        </div>
        <div className={s.gradientLine} />
      </div>
      <SwipeableViews
        className="flex-1"
        index={activeStep}
        disabled={true}
        animateHeight={true}
      >
        <div className="flex flex-1 flex-col space-y-4">
          <Text variant="pageHeading">🧑‍🚀 Данни за клиента</Text>
          <UserDataForm register={userDataRegister} errors={userDataErrors} />
        </div>
        <div>
          <Text variant="pageHeading">📦 Адрес за доставка</Text>
          <ShippingAddressForm
            register={shippingAddressRegister}
            errors={shippingAddressErrors}
            setValue={shippingAddressSetValue}
          />
        </div>
        <div>
          <Text variant="pageHeading">💵 Метод за плащане</Text>
          <PaymentForm />
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
            <span>{cart?.totalPrice ?? '0.00 лв.'}</span>
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
              disabled={activeStep === 2 || !canContinueNextStep(activeStep)}
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
        <div className={s.cartDrawerContent}>
          <CartView
            data={cart}
            isEmpty={isEmpty}
            isLoading={isLoading}
            checkoutButton={false}
            onClose={handleCloseCart}
          />
        </div>
      </Drawer>
    </Container>
  )
}

interface UserDataFormProps {
  register: UseFormRegister<UserDataFieldValues>
  errors: FieldErrors<UserDataFieldValues>
}

const UserDataForm: FC<UserDataFormProps> = ({ register, errors }) => {
  return (
    <>
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
        <Input
          register={register}
          label="firstName"
          error={errors.firstName}
          type="text"
          placeholder="Име"
        />
        <Input
          register={register}
          label="sureName"
          error={errors.sureName}
          type="text"
          placeholder="Фамилия"
        />
      </div>
      <Input
        register={register}
        type="tel"
        label="phone"
        error={errors.phone}
        placeholder="Телефонен номер"
      />
      <Input
        register={register}
        type="email"
        label="email"
        error={errors.email}
        placeholder="Емейл"
      />
    </>
  )
}
