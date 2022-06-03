import { gql } from '@apollo/client'
import cartQueryFragment from '@graphql/fragments/cartQuery'

export default gql`
  query accountCartByAccountIdQuery($accountId: ID!, $shopId: ID!, $itemsAfterCursor: ConnectionCursor) {
    cart: accountCartByAccountId(accountId: $accountId, shopId: $shopId) {
      ${cartQueryFragment}
    }
  }
`
