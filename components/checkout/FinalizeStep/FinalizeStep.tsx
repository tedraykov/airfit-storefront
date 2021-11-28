import { forwardRef, useImperativeHandle } from 'react'
import * as yup from 'yup'
import { StepSubmitCallback, Submittable } from '@hooks/useStepper'
import FinalizeSummaryPayment from '@components/checkout/FinalizeSummaryPayment'
import FinalizeSummaryShipping from '@components/checkout/FinalizeSummaryShipping/FinalizeSummaryShipping'
import { PaymentMethod } from '@utils/paymentMethods'
import { ShippingAddress } from '@framework/types/cart'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

const inputSchema = yup.object().shape({
  agreeWithTerms: yup
    .boolean()
    .oneOf([true], 'Това поле е задължително')
    .required('Това поле е задължително'),
})

interface CheckoutFinalizeProps {
  shippingAddress: ShippingAddress
  email: string
  paymentMethod: PaymentMethod
  onSubmit: StepSubmitCallback
}

export const FinalizeStep = forwardRef<Submittable, CheckoutFinalizeProps>(
  ({ shippingAddress, email, paymentMethod, onSubmit }, ref) => {
    useImperativeHandle(ref, () => ({
      submit: () =>
        handleSubmit(
          () => onSubmit({ data: null }),
          () => onSubmit({ error: true })
        )(),
    }))

    const { control, handleSubmit } = useForm({
      resolver: yupResolver(inputSchema),
    })

    return (
      <div className="flex flex-col">
        {/*<FinalizeSummaryPayment*/}
        {/*  paymentMethod={paymentMethod}*/}
        {/*/>*/}
        {/*<FinalizeSummaryShipping*/}
        {/*  shippingAddress={shippingAddress}*/}
        {/*  email={email}*/}
        {/*/>*/}
        <Controller
          control={control}
          name="agreeWithTerms"
          defaultValue={false}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={Boolean(error)}>
              <FormControlLabel
                control={<Checkbox {...field} />}
                label={
                  <>
                    Съгласявам се с{' '}
                    <Link href="https://airfit.bg/article/terms-of-use">
                      Общите условия
                    </Link>{' '}
                    на сайта.
                  </>
                }
              />
              <FormHelperText>{error && error.message}</FormHelperText>
            </FormControl>
          )}
        />
      </div>
    )
  }
)

export default FinalizeStep
