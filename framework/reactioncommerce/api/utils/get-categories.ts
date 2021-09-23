import { ReactionCommerceConfig } from '../'
import getTagsQuery from '../../utils/queries/get-all-collections-query'
import { normalizeCategory } from '@framework/utils'
import { Category } from '@commerce/types/site'

const getCategories = async (
  config: ReactionCommerceConfig
): Promise<Category[]> => {
  const {
    data: {
      tags: { edges: tags },
    },
  } = await config.fetch(getTagsQuery, {
    variables: {
      first: 250,
      shopId: config.shopId,
    },
  })
  return tags.map(normalizeCategory)
}

export default getCategories
