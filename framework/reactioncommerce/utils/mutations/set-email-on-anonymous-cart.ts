import { cartQueryFragment } from '@framework/utils/queries/get-cart-query'

const setEmailOnAnonymousCartMutation = `
  mutation setEmailOnAnonymousCartMutation(
    $cartId: ID!,
    $cartToken: String!,
    $email: String!
    $itemsAfterCursor: ConnectionCursor
  ) {
    setEmailOnAnonymousCart(input: {cartId: $cartId, cartToken: $cartToken, email: $email}) {
      cart {
        ${cartQueryFragment}
      }
    }
  }
`

export default setEmailOnAnonymousCartMutation
