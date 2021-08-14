import { ReactionCommerceConfig } from '../'
import { TagEdge } from '../../schema'
import getTagsQuery from '../../utils/queries/get-all-collections-query'
import { normalizeCategory } from '@framework/utils'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (
  config: ReactionCommerceConfig
): Promise<TagEdge[]> => {
  const { data } = await config.fetch(getTagsQuery, {
    variables: {
      first: 250,
      shopId: config.shopId,
    },
  })

  return data.tags?.edges?.map(normalizeCategory)
}

export default getCategories
