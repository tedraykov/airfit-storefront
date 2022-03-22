import { gql } from '@apollo/client'
import cartQueryFragment from '@graphql/fragments/cartQuery'

export default gql`
  mutation setShippingAddressOnCartMutation(
    $input: SetShippingAddressOnCartInput!,
    $itemsAfterCursor: ConnectionCursor
  ) {
    setShippingAddressOnCart(input: $input) {
      cart {
        ${cartQueryFragment}
      }
    }
  }
`
