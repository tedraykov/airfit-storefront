const placeOrderMutation = `
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

export default placeOrderMutation
