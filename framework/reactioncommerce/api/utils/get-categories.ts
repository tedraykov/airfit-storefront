import { ReactionCommerceConfig } from '../'
import getCategoriesQuery from '@framework/utils/queries/get-all-collections-query'
import { normalizeCategory } from '@framework/utils'
import { Category } from '@commerce/types/site'
import getTagsQuery from '@framework/utils/queries/get-tags-query'
import { NavigationTreeItem } from '@framework/schema'

const getCategories = async (
  config: ReactionCommerceConfig
): Promise<Category[]> => {
  const {
    data: {
      tags: { nodes: tags },
    },
  } = await config.fetch(getTagsQuery, {
    variables: {
      first: 250,
      shopId: config.shopId,
    },
  })

  const { data } = await config.fetch(getCategoriesQuery, {
    variables: {
      id: config.shopId,
    },
  })

  const {
    shop: {
      defaultNavigationTree: { items },
    },
  } = data

  return items.map((item: NavigationTreeItem) => normalizeCategory(item, tags))
}

export default getCategories
