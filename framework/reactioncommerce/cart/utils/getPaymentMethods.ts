import { Fetcher } from '@commerce/utils/types'
import { PaymentMethod as ReactionPaymentMethod } from '@framework/schema'
import { ResponseState } from '@commerce/utils/use-data'
import { Cart } from '@framework/types/cart'
import availablePaymentMethodsQuery from '@framework/utils/queries/available-payment-methods'

export const getPaymentMethods =
  (fetcher: Fetcher, response: ResponseState<Cart | undefined | null>) =>
  async (): Promise<string[]> => {
    const { availablePaymentMethods } = await fetcher({
      query: availablePaymentMethodsQuery,
      variables: {
        shopId: response.data!.shopId,
      },
    })

    return (availablePaymentMethods as ReactionPaymentMethod[]).map(
      (payment) => payment.name
    )
  }
