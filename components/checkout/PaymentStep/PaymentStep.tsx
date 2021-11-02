import React, { forwardRef } from 'react'
import { Text } from '@components/ui'
import PaymentForm from '@components/checkout/PaymentForm'
import { Submittable } from '@hooks/useCheckout'

const PaymentStep = forwardRef<Submittable>((_, ref) => {
  return (
    <>
      <Text variant="pageHeading">💵 Метод за плащане</Text>
      {/*<PaymentForm*/}
      {/*  availablePaymentMethods={availablePayments}*/}
      {/*  setPaymentMethod={setPayment}*/}
      {/*/>*/}
    </>
  )
})

PaymentStep.displayName = 'PaymentStep'

export default PaymentStep
