import React, { FC, useEffect, useMemo, useRef } from 'react'
import { LoadingDots, Logo } from '@components/ui'
import s from './CheckoutView.module.scss'
import Link from '@components/ui/Link'
import MobileCheckout from '@components/checkout/MobileCheckout'
import { Step } from '@hooks/useStepper'
import ShippingAddressStep from '@components/checkout/ShippingAddressStep'
import DesktopCheckout from '@components/checkout/DesktopCheckout'
import PaymentStep from '@components/checkout/PaymentStep/PaymentStep'
import { useCheckout } from '@hooks/useCheckout'
import FinalizeStep from '@components/checkout/FinalizeStep'
import { track } from '@lib/facebookPixel'
import { useRouter } from 'next/router'
import useCart from '@hooks/cart/useCart'
import useCartStore from '@hooks/cart/useCartStore'
import useUI from '@hooks/useUI'

export const CheckoutView: FC = () => {
  const { isAtLeastTablet } = useUI()
  const { cart, loading, getShippingAddress, getEmail } = useCart()
  const checkoutInitialized = useRef(false)
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

  /*
   * Track Facebook Pixel Initiate Checkout Event
   */
  useEffect(() => {
    if (checkoutInitialized.current) return

    if (!loading && cart) {
      track('InitiateCheckout', {
        contents: cart?.items?.nodes?.map((item) => ({
          id: item?.productSlug,
          quantity: item?.quantity,
        })),
        value: cart?.checkout.summary.itemTotal.amount,
        content_type: 'product',
        currency: cart?.shop?.currency?.code,
      })
      checkoutInitialized.current = true
    }
  }, [cart, loading])

  useEffect(() => {
    if (order) {
      router
        .push(`/checkout/thank-you?order=${order.referenceId}`)
        .then(() => {
          track('Purchase', {
            content_ids: cart?.items?.nodes?.map((item) => item?.productSlug),
            contents: cart?.items?.nodes?.map((item) => ({
              id: item?.productSlug,
              quantity: item?.quantity,
            })),
            content_type: 'product',
            value: cart?.checkout.summary.total.amount,
            currency: cart?.shop?.currency?.code,
          })
        })
        .then(reset)
    }
  }, [order, router, reset, cart?.items?.nodes, cart?.shop?.currency?.code])

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

  if (loading || !availablePaymentMethods) {
    return (
      <div className={s.root}>
        <CheckoutHeader />
        <div className="flex flex-1 justify-center items-center">
          <LoadingDots />
        </div>
      </div>
    )
  }

  return (
    <div className={s.root}>
      <CheckoutHeader />
      {!isAtLeastTablet && <MobileCheckout steps={getCheckoutSteps} />}
      {isAtLeastTablet && <DesktopCheckout steps={getCheckoutSteps} />}
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
