import updateFulfillmentOptionsForGroupMutation from '@framework/utils/mutations/updateFulfillmentOptionsForGroup'
import { getCartIdCookie } from '@framework/utils/get-cart-id-cookie'
import { getAnonymousCartToken } from '@framework/utils/anonymous-cart-token'
import { Cart, ShippingAddress } from '@framework/types/cart'
import setShippingAddressOnCartMutation from '@framework/utils/mutations/set-shipping-address-on-cart'
import { normalizeCart } from '@framework/utils'
import { AddressInput, Cart as ReactionCart } from '@framework/schema'
import { FetcherOptions } from '@commerce/utils/types'
import { ResponseState } from '@commerce/utils/use-data'

const handleUpdateFulfillmentOptionsForGroup = async (
  fetcher: (options: FetcherOptions) => Promise<any> | any,
  fulfillmentGroupId: string
) => {
  return await fetcher({
    query: updateFulfillmentOptionsForGroupMutation,
    variables: {
      input: {
        fulfillmentGroupId,
        cartId: getCartIdCookie(),
        cartToken: getAnonymousCartToken(),
      },
    },
  })
}

export const setShippingAddress =
  (
    fetcher: (options: FetcherOptions) => Promise<any> | any,
    response: ResponseState<Cart | null | undefined>
  ) =>
  async (address: ShippingAddress): Promise<Cart> => {
    const {
      setShippingAddressOnCart: { cart: cartWithAddress },
    } = await fetcher({
      query: setShippingAddressOnCartMutation,
      variables: {
        cartId: getCartIdCookie(),
        cartToken: getAnonymousCartToken(),
        address: <Partial<AddressInput>>{
          address1: address.address,
          city: address.city,
          country: address.country,
          firstName: address.firstName,
          fullName: `${address.firstName} ${address.sureName}`,
          lastName: address.sureName,
          phone: address.phone,
          postal: address.postal,
          region: address.region,
          isCommercial: false,
          ...(address.metafields && { metafields: address.metafields }),
        },
      },
    })

    // Update fulfillment options for current cart
    const fulfillmentGroup = cartWithAddress.checkout?.fulfillmentGroups[0]
    const {
      updateFulfillmentOptionsForGroup: { cart: cartWithFulfilmentOptions },
    } = await handleUpdateFulfillmentOptionsForGroup(
      fetcher,
      fulfillmentGroup?._id ?? ''
    )

    const normalizedCart = normalizeCart(
      cartWithFulfilmentOptions as ReactionCart
    )!

    await response.mutate(
      {
        ...response.data!,
        ...normalizedCart,
      },
      false
    )

    return normalizedCart
  }
