import { gql } from '@apollo/client'
import cartPayloadFragment from '@graphql/fragments/cartPayload'

export default gql`
  mutation UpdateCartItemsQuantity($input: UpdateCartItemsQuantityInput!) {
    updateCartItemsQuantity(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`
