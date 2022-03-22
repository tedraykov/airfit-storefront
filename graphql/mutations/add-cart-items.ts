import { gql } from '@apollo/client'
import cartPayloadFragment from '@graphql/fragments/cartPayload'
import incorrectPriceFailureDetailsFragment from '@graphql/fragments/incorrectPriceFailureDetails'
import minOrderQuantityFailureDetailsFragment from '@graphql/fragments/minOrderQuantityFailureDetails'

export default gql`
  mutation addCartItemsMutation($input: AddCartItemsInput!) {
    addCartItems(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
      incorrectPriceFailures {
        ${incorrectPriceFailureDetailsFragment}
      }
      minOrderQuantityFailures {
        ${minOrderQuantityFailureDetailsFragment}
      }
      clientMutationId
    }
  }
`
