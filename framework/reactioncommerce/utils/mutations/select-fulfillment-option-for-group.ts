import { cartPayloadFragment } from '@framework/utils/queries/get-cart-query'

const selectFulfillmentOptionForGroup = `
mutation selectFulfillmentOptionForGroup($input: SelectFulfillmentOptionForGroupInput!){
  selectFulfillmentOptionForGroup(input: $input) {
    cart {
      ${cartPayloadFragment}
    }
  }
}
`

export default selectFulfillmentOptionForGroup
