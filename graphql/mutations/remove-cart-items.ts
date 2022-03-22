import { gql } from '@apollo/client'
import cartPayloadFragment from '@graphql/fragments/cartPayload'

export default gql`
  mutation removeCartItemsMutation($input: RemoveCartItemsInput!) {
    removeCartItems(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`
