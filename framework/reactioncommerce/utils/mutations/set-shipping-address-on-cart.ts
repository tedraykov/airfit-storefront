import { cartQueryFragment } from '@framework/utils/queries/get-cart-query'

const setShippingAddressOnCartMutation = `
  mutation setShippingAddressOnCartMutation(
    $cartId: ID!,
    $cartToken: String,
    $address: AddressInput!,
    $itemsAfterCursor: ConnectionCursor
  ) {
    setShippingAddressOnCart(input: {
      cartId: $cartId,
      address: $address,
      cartToken: $cartToken
     }) {
      cart {
        ${cartQueryFragment}
      }
    }
  }
`

export default setShippingAddressOnCartMutation
