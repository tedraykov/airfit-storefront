import { ReactionCommerceConfig } from '../api'
import { Tag, TagEdge } from '../schema'
import getTagsQuery from './queries/get-all-collections-query'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (
  config: ReactionCommerceConfig
): Promise<Tag[]> => {
  const { data } = await config.fetch(getTagsQuery, {
    variables: {
      first: 250,
      shopId: config.shopId,
    },
  })

  return (
    data.tags?.edges?.map(({ node }: TagEdge) => ({
      entityId: node?._id,
      name: node?.displayTitle,
      path: `/${node?.slug}`,
    })) ?? []
  )
}

export default getCategories
