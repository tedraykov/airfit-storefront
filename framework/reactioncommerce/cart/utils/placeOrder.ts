import { Fetcher } from '@commerce/utils/types'
import { Order, PlaceOrderInput } from '@framework/types/order'
import placeOrderMutation from '@framework/utils/mutations/place-order-mutation'
import { PlaceOrderInput as ReactionPlaceOrderInput } from '@framework/schema'

export const placeOrder =
  (fetcher: Fetcher) =>
  async (placeOrderInput: PlaceOrderInput): Promise<Order> => {
    const {
      placeOrder: { orders },
    } = await fetcher({
      query: placeOrderMutation,
      variables: {
        input: <ReactionPlaceOrderInput>{},
      },
    })

    return orders
  }
