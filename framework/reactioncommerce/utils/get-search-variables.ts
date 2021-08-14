import getSortVariables from './get-sort-variables'
import { SearchProductsBody } from '@framework/types/product'

export const getSearchVariables = ({
  brandId,
  search,
  categoryId,
  sort,
}: SearchProductsBody) => {
  let searchQuery = ''
  let tagIdsParam = {}

  if (search) {
    searchQuery += search
  }

  if (brandId) {
    searchQuery += `${search ? ' ' : ''}${brandId}`
  }

  if (categoryId) {
    tagIdsParam = {
      tagIds: [categoryId],
    }
  }

  return {
    searchQuery,
    ...tagIdsParam,
    ...getSortVariables(sort, !!categoryId),
  }
}

export default getSearchVariables
