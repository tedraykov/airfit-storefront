import { SHOP_ID } from '@config/index'
import { useCallback, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import availablePaymentMethodsQuery from '@graphql/queries/availablePaymentMethods'
import { PaymentMethod } from '@framework/schema'

export default function useShop() {
  const [shopId] = useState(SHOP_ID)

  const [_getPaymentMethods] = useLazyQuery<{
    availablePaymentMethods: PaymentMethod[]
  }>(availablePaymentMethodsQuery)

  const getPaymentMethods = useCallback(async () => {
    const { data } = await _getPaymentMethods({
      variables: {
        shopId,
      },
    })
    return data?.availablePaymentMethods?.map((payment) => payment.name) || []
  }, [_getPaymentMethods, shopId])

  return {
    shopId,
    getPaymentMethods,
  }
}
