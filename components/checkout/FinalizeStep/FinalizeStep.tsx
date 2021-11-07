import { forwardRef, useImperativeHandle } from 'react'
import { StepSubmitCallback, Submittable } from '@hooks/useStepper'
import FinalizeSummaryPayment from '@components/checkout/FinalizeSummaryPayment'
import FinalizeSummaryShipping from '@components/checkout/FinalizeSummaryShipping/FinalizeSummaryShipping'
import { PaymentMethod } from '@utils/paymentMethods'
import { ShippingAddress } from '@framework/types/cart'

interface CheckoutFinalizeProps {
  shippingAddress: ShippingAddress
  email: string
  paymentMethod: PaymentMethod
  onSubmit: StepSubmitCallback
}

export const FinalizeStep = forwardRef<Submittable, CheckoutFinalizeProps>(
  ({ shippingAddress, email, paymentMethod, onSubmit }, ref) => {
    useImperativeHandle(ref, () => ({
      submit: () => onSubmit({ data: null }),
    }))

    return (
      <div className="flex flex-col items-center">
        {/*<FinalizeSummaryPayment*/}
        {/*  paymentMethod={paymentMethod}*/}
        {/*/>*/}
        {/*<FinalizeSummaryShipping*/}
        {/*  shippingAddress={shippingAddress}*/}
        {/*  email={email}*/}
        {/*/>*/}
      </div>
    )
  }
)

export default FinalizeStep
