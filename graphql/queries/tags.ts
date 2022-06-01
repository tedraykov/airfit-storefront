import { gql } from '@apollo/client'

export default gql`
  query getTags($first: ConnectionLimitInt!, $shopId: ID!) {
    tags(first: $first, shopId: $shopId) {
      nodes {
        _id
        displayTitle
        slug
      }
    }
  }
`
