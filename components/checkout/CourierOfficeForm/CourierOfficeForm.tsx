import { Box } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

import { ShippingAddress } from '@framework/types/cart'
import ControlledTextField from '@components/ui/ControlledTextField'
import { StepSubmitCallback, Submittable } from '@hooks/useStepper'
import { Office } from 'econt-js'
import CourierOfficeSelect from '../CourierOfficeSelect'
import { SetShippingAddressProps } from '@hooks/useCheckout'
import { AddressInput, MetafieldInput } from '@framework/schema'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Задължително поле'),
  sureName: yup.string().required('Задължително поле'),
  phone: yup
    .string()
    .matches(/^\+?\d+$/, 'Въведете валиден номер')
    .required('Задължително поле'),
  email: yup
    .string()
    .email('Въведете валиден мейл')
    .required('Задължително поле'),
  courierOffice: yup.object().nullable().required('Задължително поле'),
})

export interface CourierOfficeFieldValues {
  firstName: string
  sureName: string
  phone: string
  email: string
  courierOffice: Office
}

type CourierOfficeFormProps = {
  shippingAddress?: ShippingAddress
  email?: string
  onSubmit: StepSubmitCallback<SetShippingAddressProps>
}

const CourierOfficeForm = forwardRef<Submittable, CourierOfficeFormProps>(
  ({ shippingAddress, email, onSubmit }, ref) => {
    const { control, handleSubmit } = useForm<CourierOfficeFieldValues>({
      mode: 'onChange',
      resolver: yupResolver(validationSchema),
    })

    useImperativeHandle(ref, () => ({
      submit() {
        handleSubmit(
          (values) => {
            onSubmit({
              data: {
                ...({
                  phone: values.phone,
                  firstName: values.firstName,
                  lastName: values.sureName,
                  fullName: [values.firstName, values.sureName].join(' '),
                  address1:
                    values.courierOffice.address.street ||
                    values.courierOffice.address.other ||
                    'No street',
                  city: values.courierOffice.address.city.name || 'Econt City',
                  region:
                    values.courierOffice.address.city.regionName ||
                    values.courierOffice.address.city.name ||
                    'Econt region',
                  postal:
                    values.courierOffice.address.city.postCode ||
                    'Econt postal',
                  country:
                    values.courierOffice.address.city.country.code2 || 'BG',
                  metafields: [
                    {
                      key: 'courier',
                      value: 'econt',
                    } as MetafieldInput,
                    {
                      key: 'courierOfficeCode',
                      value: values.courierOffice.code,
                    } as MetafieldInput,
                  ],
                  isCommercial: false,
                } as AddressInput),
                email: values.email,
              },
              error: null,
            })
          },
          (e) => {
            console.log(e)

            onSubmit({ data: null, error: true })
          }
        )()
      },
    }))

    return (
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledTextField
          name="firstName"
          control={control}
          defaultValue={shippingAddress?.firstName ?? ''}
          label="Име"
        />
        <ControlledTextField
          name="sureName"
          control={control}
          defaultValue={shippingAddress?.sureName ?? ''}
          label="Фамилия"
        />
        <ControlledTextField
          name="phone"
          control={control}
          defaultValue={shippingAddress?.phone ?? ''}
          label="Телефонен номер"
        />
        <ControlledTextField
          name="email"
          control={control}
          defaultValue={(email && email) || ''}
          label="Имейл"
        />
        <CourierOfficeSelect control={control} />
      </Box>
    )
  }
)

CourierOfficeForm.displayName = 'CourierOfficeForm'

export default CourierOfficeForm
