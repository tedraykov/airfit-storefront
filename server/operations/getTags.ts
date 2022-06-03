import graphQLRequest from '../graphQLRequest'
import { TagConnection } from '@graphql/schema'
import { SHOP_ID } from '@config/index'
import { getTagsQuery } from '@graphql/queries'

export default async function getTags() {
  const data = await graphQLRequest<{ tags: TagConnection }>(getTagsQuery, {
    first: 200,
    shopId: SHOP_ID,
  })

  return (data && data.tags && data.tags.nodes) || []
}
