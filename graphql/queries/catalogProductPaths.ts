import { gql } from '@apollo/client'

export const catalogItemsConnection = `
pageInfo {
  hasNextPage
  hasPreviousPage
}
totalCount
nodes {
  _id
  ... on CatalogItemProduct {
    product {
      _id
      slug
    }
  }
}`

export const catalogItemsFragment = `
catalogItems(
  first: $first
  offset: $offset
  shopIds: $shopIds
) {
  ${catalogItemsConnection}
}
`

export default gql`
  query catalogItems(
    $first: ConnectionLimitInt = 20
    $offset: Int = 0
    $shopIds: [ID]!
  ) {
    ${catalogItemsFragment}
  }
`
