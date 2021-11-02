import React, { FC, useEffect, useState } from 'react'
import { Button, Container, Input, Logo, Text } from '@components/ui'
import s from './CheckoutView.module.scss'
import { PaymentInput } from '@framework/schema'
import { FieldErrors, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import Link from '@components/ui/Link'
import { Cart } from '@framework/types/cart'
import {
  FulfillmentGroupOrderInput,
  Order,
  OrderInput,
} from '@framework/types/order'
import { CheckoutFinalize } from '@components/checkout/CheckoutFinalize/CheckoutFinalize'
import CartSummary from '@components/cart/CartSummary'
import { Theme, useMediaQuery } from '@mui/material'
import MobileCheckout from '@components/checkout/MobileCheckout'
import { CheckoutStep } from '@hooks/useCheckout'
import ShippingAddressStep from '@components/checkout/ShippingAddressStep'
import DesktopCheckout from '@components/checkout/DesktopCheckout'

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
  const [continueButtonLoading, setContinueButtonLoading] = useState(false)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const {
    register: userDataRegister,
    getValues: userDataGetValues,
    formState: { errors: userDataErrors, isValid: userDataIsValid },
  } = useForm<UserDataFieldValues>({
    resolver: yupResolver(userDataFormSchema),
    mode: 'all',
  })

  const {
    register: shippingAddressRegister,
    getValues: shippingAddressGetValues,
    setValue: shippingAddressSetValue,
    formState: {
      errors: shippingAddressErrors,
      isValid: shippingAddressIsValid,
    },
  } = useForm<ShippingAddressFieldValues>({ mode: 'all' })

  const [availablePayments, setAvailablePayments] = useState<string[]>([])
  const [payment, setPayment] = useState<string | undefined>(undefined)
  const [order, setOrder] = useState<Order | undefined>(undefined)

  const handleNext = async () => {
    if (continueButtonLoading) return

    switch (activeStep) {
      case 1:
        setContinueButtonLoading(true)
        await handleSetShippingAddress()
        await fetchAvailablePayments()
        setContinueButtonLoading(false)
        break
      case 2:
        setContinueButtonLoading(true)
        await handlePlaceOrder()
        setContinueButtonLoading(false)
        break
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
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
      case 2:
        return !!payment
    }
    return false
  }

  const handleSetShippingAddress = async () => {
    const { mutationQueries } = cart!
    const updatedCart = await mutationQueries!.setShippingAddress({
      phone: userDataGetValues('phone').toString(),
      firstName: userDataGetValues('firstName'),
      sureName: userDataGetValues('sureName'),
      fullName: `${userDataGetValues('firstName')} ${userDataGetValues(
        'sureName'
      )}`,
      address: shippingAddressGetValues('address'),
      city: shippingAddressGetValues('locality'),
      region: shippingAddressGetValues('locality'),
      country: 'България',
      postal: shippingAddressGetValues('postalCode'),
    })

    await mutationQueries!.setEmailOnAnonymousCart(userDataGetValues('email'))

    await mutationQueries!.setShipmentMethod(
      updatedCart.fulfillmentGroups[0].id,
      updatedCart.fulfillmentGroups[0].availableFulfillmentOptions[0]
        .fulfillmentMethod.id
    )
  }

  const fetchAvailablePayments = async () => {
    const availablePayments =
      (await cart?.mutationQueries?.getPaymentMethods()) ?? []
    setAvailablePayments(availablePayments)
  }

  const buildOrder = (): OrderInput => {
    const fulfillmentGroups = cart!.fulfillmentGroups!.map((group) => {
      const { data, selectedFulfillmentOption } = group!

      return {
        data,
        items: cart?.lineItems,
        selectedFulfillmentMethodId:
          selectedFulfillmentOption!.fulfillmentMethod.id,
        shopId: group!.shopId,
        totalPrice: cart?.totalPrice,
        type: group!.type,
      } as FulfillmentGroupOrderInput
    })

    return {
      cartId: cart!.id,
      currencyCode: cart!.currency.code,
      email: cart!.email!,
      fulfillmentGroups: fulfillmentGroups,
      shopId: cart!.shopId,
    }
  }

  const handlePlaceOrder = async () => {
    const orderInput = buildOrder()
    const { mutationQueries } = cart!

    const order = await mutationQueries!.placeOrder({
      order: orderInput,
      payments: [
        {
          amount: cart?.totalPrice ?? 0,
          method: payment!,
        } as PaymentInput,
      ],
    })

    setOrder(order)
  }

  const checkoutSteps: CheckoutStep[] = [
    {
      StepComponent: ShippingAddressStep,
    },
  ]

  return (
    <div className={s.root}>
      <CheckoutHeader />
      {isMobile ? (
        <MobileCheckout
          cart={cart!}
          isLoading={isLoading}
          isEmpty={isEmpty}
          steps={checkoutSteps}
        />
      ) : (
        <DesktopCheckout
          cart={cart!}
          steps={checkoutSteps}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

const CheckoutHeader: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <Link href="/">
          <Logo reversedColor={true} />
        </Link>
      </div>
      <div className={s.gradientLine} />
    </header>
  )
}
