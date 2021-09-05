import { cartQueryFragment } from '@framework/utils/queries/get-cart-query'

const updateFulfillmentOptionsForGroupMutation = `
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

export default updateFulfillmentOptionsForGroupMutation
