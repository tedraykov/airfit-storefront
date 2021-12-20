import React, { FC, useEffect, useMemo } from 'react'
import { LoadingDots, Logo } from '@components/ui'
import s from './CheckoutView.module.scss'
import Link from '@components/ui/Link'
import { Cart } from '@framework/types/cart'
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

interface CheckoutViewProps {
  cart: Cart | null | undefined
  isLoading: boolean
  isEmpty: boolean
}

export const CheckoutView: FC<CheckoutViewProps> = ({
  cart,
  isLoading,
  isEmpty,
}) => {
  const {
    availablePaymentMethods,
    getShippingAddress,
    getEmail,
    getPaymentsMethods,
    handleSetShippingAddress,
    handleSelectPaymentMethod,
    handlePlaceOrder,
    order,
    paymentMethod,
  } = useCheckout({ cart })
  const router = useRouter()

  useEffect(() => {
    track('InitiateCheckout')
  }, [])

  useEffect(() => {
    if (!order) return
    router.push(`/checkout/thank-you?order=${order.referenceId}`)
  }, [order])

  const getCheckoutSteps = useMemo((): Step[] => {
    if (!cart || !availablePaymentMethods) return []
    return [
      {
        label: 'Адрес за доставка',
        icon: '📦',
        isComplete: getShippingAddress() !== null && getEmail() !== null,
        StepComponent: ShippingAddressStep,
        stepComponentProps: {
          shippingAddress: getShippingAddress(),
          email: getEmail(),
        },
        onSubmit: handleSetShippingAddress,
      },
      {
        label: 'Метод за плащане',
        icon: '💵',
        isComplete: false,
        StepComponent: PaymentStep,
        stepComponentProps: {
          paymentMethods: getPaymentsMethods(),
        },
        onSubmit: handleSelectPaymentMethod,
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
        onSubmit: handlePlaceOrder,
      },
    ]
  }, [cart, availablePaymentMethods, paymentMethod])

  return (
    <div className={s.root}>
      <CheckoutHeader />
      {isLoading || !availablePaymentMethods ? (
        <div className="flex flex-1 justify-center items-center">
          <LoadingDots />
        </div>
      ) : (
        <MediaContextProvider>
          <Media lessThan="lg" className={s.sliderContainer}>
            <MobileCheckout
              cart={cart!}
              isLoading={isLoading}
              isEmpty={isEmpty}
              steps={getCheckoutSteps}
            />
          </Media>
          <Media greaterThanOrEqual="lg" className={s.galleryContainer}>
            <DesktopCheckout
              cart={cart!}
              steps={getCheckoutSteps}
              isLoading={isLoading}
            />
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
