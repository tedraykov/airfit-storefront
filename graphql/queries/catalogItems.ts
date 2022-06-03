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
      title
      slug
      description
      vendor
      isLowQuantity
      isSoldOut
      isBackorder
      shop {
        currency {
          code
        }
      }
      pricing {
        currency {
          code
        }
        displayPrice
        minPrice
        maxPrice
      }
      primaryImage {
        URLs {
          thumbnail
          small
          medium
          large
          original
        }
      }
      variants {
        pricing {
          compareAtPrice {
            amount
          }
          price
        }
      }
    }
  }
}`

export const catalogItemsFragment = `
catalogItems(
  first: $first
  offset: $offset
  sortBy: $sortBy
  sortOrder: $sortOrder
  tagIds: $tagIds
  shopIds: $shopIds
  searchQuery: $searchQuery
) {
  ${catalogItemsConnection}
}
`

export default gql`
  query catalogItems(
    $first: ConnectionLimitInt = 20
    $offset: Int = 0
    $sortBy: CatalogItemSortByField = updatedAt
    $sortOrder: SortOrder = desc
    $tagIds: [ID]
    $shopIds: [ID]!
    $searchQuery: String
  ) {
    ${catalogItemsFragment}
  }
`
