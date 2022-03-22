import { cartPayloadFragment } from '@framework/utils/queries/get-cart-query'

const applyDiscountCodeToCartMutation = /* GraphQL */ `
mutation applyDiscountCodeToCartMutation($input: ApplyDiscountCodeToCartInput!) {
  applyDiscountCodeToCart(input: $input){
    cart {
        ${cartPayloadFragment}
      }
  }
}
`

export default applyDiscountCodeToCartMutation
