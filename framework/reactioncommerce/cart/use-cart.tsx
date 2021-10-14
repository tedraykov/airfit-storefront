import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useCart, { UseCart } from '@commerce/cart/use-cart'
import { GetCartHook } from '@framework/types/cart'
import { useFetcher } from '@commerce/utils/use-hook'
import { setShippingAddress } from '@framework/cart/utils/setShippingAddress'
import { setShipmentMethod } from '@framework/cart/utils/setShipmentMethod'
import { placeOrder } from '@framework/cart/utils/placeOrder'
import { setEmailOnAnonymousCart } from '@framework/cart/utils/setEmailOnAnonymousCart'
import { getPaymentMethods } from '@framework/cart/utils/getPaymentMethods'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    method: 'GET',
    url: '/api/cart',
  },
  async fetcher({ options, fetch }) {
    return await fetch(options)
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: true, ...input?.swrOptions },
      })

      const fetcher = useFetcher()

      if (response.data && input?.isCheckout) {
        response.data.mutationQueries = {
          setShippingAddress: setShippingAddress(fetcher, response),
          setShipmentMethod: setShipmentMethod(fetcher, response),
          placeOrder: placeOrder(fetcher),
          setEmailOnAnonymousCart: setEmailOnAnonymousCart(fetcher, response),
          getPaymentMethods: getPaymentMethods(fetcher, response),
        }
      }

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.lineItems.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
