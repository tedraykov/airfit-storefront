import { gql } from '@apollo/client'
import cartQueryFragment from '@graphql/fragments/cartQuery'

export default gql`
  query anonymousCartByCartIdQuery($cartId: ID!, $cartToken: String!, $itemsAfterCursor: ConnectionCursor) {
    cart: anonymousCartByCartId(cartId: $cartId, cartToken: $cartToken) {
      ${cartQueryFragment}
    }
  }
`
