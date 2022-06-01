import graphQLRequest from '../graphQLRequest'
import { Tag } from '@graphql/schema'
import { SHOP_ID } from '@config/index'
import { getTagQuery } from '@graphql/queries'

export default async function getTag(slug: string) {
  try {
    const data = await graphQLRequest<{ tag: Tag }>(getTagQuery, {
      shopId: SHOP_ID,
      slugOrId: slug,
    })

    return data?.tag
  } catch (e) {
    return null
  }
}
