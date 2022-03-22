import { gql } from '@apollo/client'
import cartCommon from '@graphql/fragments/cartCommon'

const getCartQuery = gql`
  query($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        ${cartCommon}
      }
    }
  }
`

export default getCartQuery
