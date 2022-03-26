import React, { FC, useEffect, useMemo } from 'react'
import { LoadingDots, Logo } from '@components/ui'
import s from './CheckoutView.module.scss'
import Link from '@components/ui/Link'
import MobileCheckout from '@components/checkout/MobileCheckout'
import { Step } from '@hooks/useStepper'
import ShippingAddressStep from '@components/checkout/ShippingAddressStep'
import DesktopCheckout from '@components/checkout/DesktopCheckout'
import PaymentStep from '@components/checkout/PaymentStep/PaymentStep'
import { useCheckout } from '@hooks/useCheckout'
import { Media, MediaContextProvider } from '@components/common/MediaQueries'
import FinalizeStep from '@components/checkout/FinalizeStep'
import { track } from '@lib/facebookPixel'
import { useRouter } from 'next/router'
import useCart from '@hooks/cart/useCart'
import useCartStore from '@hooks/cart/useCartStore'

export const CheckoutView: FC = () => {
  const { cart, loading, getShippingAddress, getEmail } = useCart()
  const { reset } = useCartStore()
  const {
    availablePaymentMethods,
    getPaymentsMethods,
    order,
    paymentMethod,
    selectPaymentMethod,
    setShippingAddressOnCart,
    placeOrder,
  } = useCheckout()

  const router = useRouter()

  useEffect(() => {
    track('InitiateCheckout')
  }, [])

  useEffect(() => {
    if (order) {
      reset()
      router.push(`/checkout/thank-you?order=${order.referenceId}`)
    }
  }, [order, router, reset])

  const getCheckoutSteps = useMemo((): Step[] => {
    if (!cart || !availablePaymentMethods) return []
    return [
      {
        label: 'Адрес за доставка',
        icon: '📦',
        isComplete: false,
        StepComponent: ShippingAddressStep,
        stepComponentProps: {
          shippingAddress: getShippingAddress(),
          email: getEmail(),
        },
        onSubmit: setShippingAddressOnCart,
      },
      {
        label: 'Метод за плащане',
        icon: '💵',
        isComplete: false,
        StepComponent: PaymentStep,
        stepComponentProps: {
          paymentMethods: getPaymentsMethods(),
        },
        onSubmit: selectPaymentMethod,
      },
      {
        label: 'Финализиране',
        icon: '✔️',
        isComplete: false,
        StepComponent: FinalizeStep,
        stepComponentProps: {
          paymentMethod: paymentMethod,
          shippingAddress: getShippingAddress(),
          email: getEmail(),
        },
        onSubmit: placeOrder,
      },
    ]
  }, [
    cart,
    availablePaymentMethods,
    getShippingAddress,
    getEmail,
    setShippingAddressOnCart,
    getPaymentsMethods,
    selectPaymentMethod,
    paymentMethod,
    placeOrder,
  ])

  return (
    <div className={s.root}>
      <CheckoutHeader />
      {loading || !availablePaymentMethods ? (
        <div className="flex flex-1 justify-center items-center">
          <LoadingDots />
        </div>
      ) : (
        <MediaContextProvider>
          <Media lessThan="lg" className={s.sliderContainer}>
            <MobileCheckout steps={getCheckoutSteps} />
          </Media>
          <Media greaterThanOrEqual="lg" className={s.galleryContainer}>
            <DesktopCheckout steps={getCheckoutSteps} />
          </Media>
        </MediaContextProvider>
      )}
    </div>
  )
}

export const CheckoutHeader: FC = () => {
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
