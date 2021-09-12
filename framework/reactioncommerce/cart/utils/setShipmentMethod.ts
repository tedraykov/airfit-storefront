import selectFulfillmentOptionForGroup from '@framework/utils/mutations/select-fulfillment-option-for-group'
import { SelectFulfillmentOptionForGroupInput } from '@framework/schema'
import { Fetcher } from '@commerce/utils/types'
import { ResponseState } from '@commerce/utils/use-data'
import { Cart } from '@framework/types/cart'
import { Cart as ReactionCart } from '@framework/schema'
import { normalizeCart } from '@framework/utils'

export const setShipmentMethod = (
  fetcher: Fetcher,
  response: ResponseState<Cart | undefined | null>
) =>
  async (
    fulfillmentGroupId: string,
    fulfillmentMethodId: string
  ): Promise<Cart> => {
    const {
      selectFulfillmentOptionForGroup: { cart: cartWithOptionsSelected }
    } = await fetcher({
      query: selectFulfillmentOptionForGroup,
      variables: {
        input: <SelectFulfillmentOptionForGroupInput>{
          cartId: response.data?.id,
          fulfillmentGroupId,
          fulfillmentMethodId
        }
      }
    })
    const normalizedCart = normalizeCart(
      cartWithOptionsSelected as ReactionCart
    )!

    await response.mutate(
      {
        ...response.data!,
        ...normalizedCart
      },
      false
    )

    return normalizedCart
  }
