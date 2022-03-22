import { gql } from '@apollo/client'
import cartQueryFragment from '@graphql/fragments/cartQuery'

export default gql`
  mutation updateFulfillmentOptionsForGroupMutation(
    $input: UpdateFulfillmentOptionsForGroupInput!,
    $itemsAfterCursor: ConnectionCursor
  ) {
    updateFulfillmentOptionsForGroup(input: $input) {
      cart {
        ${cartQueryFragment}
      }
    }
  }
`
