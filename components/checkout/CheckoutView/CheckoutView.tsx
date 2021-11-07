import React, { FC, useMemo } from 'react'
import { Logo } from '@components/ui'
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
import { CircularProgress } from '@mui/material'
import FinalizeStep from '@components/checkout/FinalizeStep'
import { Text } from '@components/ui'
import { SuccessCheck } from '@components/ui/SuccessCheck/SuccessCheck'

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
          <CircularProgress size="2rem" />
        </div>
      ) : order ? (
        <div className="flex flex-col items-center">
          <Text variant="pageHeading" className="mt-10 mb-4">
            Вашата поръчка беше приета успешно!
          </Text>
          <SuccessCheck />
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
