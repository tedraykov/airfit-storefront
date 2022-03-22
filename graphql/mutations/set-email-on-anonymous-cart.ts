import { gql } from '@apollo/client'
import cartQueryFragment from '@graphql/fragments/cartQuery'

export default gql`
  mutation setEmailOnAnonymousCartMutation(
    $input: SetEmailOnAnonymousCartInput!
    $itemsAfterCursor: ConnectionCursor
  ) {
    setEmailOnAnonymousCart(input: $input) {
      cart {
        ${cartQueryFragment}
      }
    }
  }
`
