import cartPayloadFragment from '@graphql/fragments/cartPayload'
import { gql } from '@apollo/client'

export default gql`
  mutation selectFulfillmentOptionForGroup($input: SelectFulfillmentOptionForGroupInput!){
    selectFulfillmentOptionForGroup(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`
