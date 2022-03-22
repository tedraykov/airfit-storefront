import { gql } from '@apollo/client'

export default gql`
  mutation placeOrderMutation($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      orders {
        cartId
        status
        totalItemQuantity
        _id
        referenceId
      }
    }
  }
`
