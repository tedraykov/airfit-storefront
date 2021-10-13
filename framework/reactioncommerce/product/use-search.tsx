import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'

import { CatalogItemEdge, CatalogItemProduct } from '../schema'
import {
  catalogItemsQuery,
  getSearchVariables,
  normalizeProduct,
} from '../utils'
import { SearchProductsHook } from '@framework/types/product'
import { getShopId } from '@framework/utils/get-shop-id'

export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: catalogItemsQuery,
  },
  async fetcher({ input, options, fetch }) {
    const shopId = getShopId()

    const data = await fetch({
      query: options.query,
      method: options?.method,
      variables: {
        ...getSearchVariables(input),
        shopIds: [shopId],
      },
    })

    let edges

    edges = data.catalogItems?.edges ?? []

    return {
      products: edges.map(({ node }: CatalogItemEdge) =>
        normalizeProduct(node as CatalogItemProduct)
      ),
      found: !!edges.length,
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
          ['shopId', input.shopId],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
