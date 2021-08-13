import { Product } from '@commerce/types/product'
import { OperationContext } from '@commerce/api/operations'
import { normalizeProduct } from '@framework/utils'
import catalogItemsQuery from '../../utils/queries/catalog-items-query'
import { Provider, ReactionCommerceConfig } from '..'
import { CatalogItemEdge } from '@framework/schema'

export type ProductVariables = {
  first?: number
  shopIds?: string[]
}

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts({
    query = catalogItemsQuery,
    variables: { ...vars } = { first: 250 },
    config: cfg,
  }: {
    query?: string
    variables?: ProductVariables
    config?: ReactionCommerceConfig
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    console.log('Getting all products')
    const config = commerce.getConfig(cfg)
    const { data } = await config.fetch(query, {
      variables: {
        ...vars,
        shopIds: [config.shopId],
      },
    })
    console.log(data)
    return {
      products:
        data.catalogItems?.edges?.map((item: CatalogItemEdge | null) =>
          normalizeProduct(item?.node)
        ) || [],
    }
  }

  return getAllProducts
}
