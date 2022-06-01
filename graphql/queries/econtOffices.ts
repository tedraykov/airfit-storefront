import { gql } from '@apollo/client'

export default gql`
  query EcontOffices(
    $searchQuery: String
    $first: ConnectionLimitInt = 20
    $offset: Int = 0
  ) {
    econtOffices(searchQuery: $searchQuery, first: $first, offset: $offset) {
      nodes {
        code
        name
        address {
          address1
          city
          company
          country
          isCommercial
          metafields {
            key
            value
          }
          postal
          region
        }
      }
      totalCount
      pageInfo {
        hasNextPage
      }
    }
  }
`
