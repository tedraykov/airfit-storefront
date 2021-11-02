import React, { FC, forwardRef } from 'react'
import { Text } from '@components/ui'
import ShippingAddressForm from '@components/checkout/ShippingAddressForm'
import { Submittable } from '@hooks/useCheckout'

const ShippingAddressStep = forwardRef<Submittable>((_, ref) => {
  return (
    <>
      <Text variant="pageHeading">📦 Адрес за доставка</Text>
      {/*<ShippingAddressForm*/}
      {/*  register={shippingAddressRegister}*/}
      {/*  errors={shippingAddressErrors}*/}
      {/*  setValue={shippingAddressSetValue}*/}
      {/*/>*/}
    </>
  )
})

export default ShippingAddressStep
