import { gql } from '@apollo/client'

export default gql`
  query Tag($slugOrId: String!, $shopId: ID!) {
    tag(slugOrId: $slugOrId, shopId: $shopId) {
      _id
      displayTitle
      heroMediaUrl
      name
      slug
    }
  }
`
