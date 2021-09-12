import { FC } from 'react'
import { Button, Text } from '@components/ui'
import { SuccessCheck } from '@components/ui/SuccessCheck/SuccessCheck'
import { useRouter } from 'next/router'
import { Order } from '@framework/types/order'

interface CheckoutFinalizeProps {
  order?: Order
}

export const CheckoutFinalize: FC<CheckoutFinalizeProps> = (
  {
    order
  }) => {
  const router = useRouter()

  const handleNavigateToOrder = async () => {
    await router.push(`order/${order!.referenceId}`)
  }

  return (
    <div className='flex flex-col items-center'>
      <Text variant='pageHeading'
            className='mt-10 mb-4'>Вашата поръчка беше приета успешно!</Text>
      <SuccessCheck />
      <Button onClick={handleNavigateToOrder}>Преглед на поръчката</Button>
    </div>
  )
}
