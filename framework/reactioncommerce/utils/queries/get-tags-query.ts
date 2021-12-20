const getTagsQuery = /* GraphQL */ `
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
export default getTagsQuery
