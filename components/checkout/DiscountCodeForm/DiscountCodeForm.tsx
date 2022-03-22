import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Cart } from '@framework/types/cart'
import ControlledTextField from '@components/ui/ControlledTextField'
import { Button } from '@components/ui'
import useCart from '@hooks/cart/useCart'

export interface DiscountCodeFieldValues {
  discountCode: string
}

const DiscountCodeForm: FC = () => {
  const { applyDiscountCode } = useCart()
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { isDirty },
  } = useForm<DiscountCodeFieldValues>({
    mode: 'onSubmit',
  })

  const onSubmit = async ({ discountCode }: DiscountCodeFieldValues) => {
    await applyDiscountCode(discountCode).catch((e: Error) => {
      if (e.message.includes('No discount found')) {
        setError('discountCode', {
          message: `Код "${getValues('discountCode')}" не е намерен`,
        })
      }
      if (e.message.includes('already applied')) {
        setError('discountCode', {
          message: `Код "${getValues('discountCode')}" вече е приложен`,
        })
      }
    })
  }

  return (
    <div className="flex space-x-3 mb-5">
      <ControlledTextField
        className="flex-1"
        name="discountCode"
        control={control}
        defaultValue={''}
        label="Промо код"
      />
      <Button
        disabled={!isDirty}
        type="submit"
        size="slim"
        onClick={handleSubmit(onSubmit)}
      >
        Приложи
      </Button>
    </div>
  )
}

export default DiscountCodeForm
