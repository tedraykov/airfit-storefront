import { gql } from '@apollo/client'
import cartPayloadFragment from '@graphql/fragments/cartPayload'

export default gql`
mutation applyDiscountCodeToCartMutation($input: ApplyDiscountCodeToCartInput!) {
  applyDiscountCodeToCart(input: $input){
    cart {
        ${cartPayloadFragment}
      }
  }
}
`
