import { Product } from '@framework/types/product'
import { OperationContext } from '@commerce/api/operations'
import { normalizeProduct } from '@framework/utils'
import catalogItemsQuery from '../../utils/queries/catalog-items-query'
import { Provider, ReactionCommerceConfig } from '..'
import { CatalogItemEdge, CatalogItemProduct } from '@framework/schema'

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
    const config = commerce.getConfig(cfg)
    const { data } = await config.fetch(query, {
      variables: {
        ...vars,
        shopIds: [config.shopId],
      },
    })

    return {
      products:
        data.catalogItems?.edges?.map((item: CatalogItemEdge | null) =>
          normalizeProduct(item?.node as CatalogItemProduct)
        ) || [],
    }
  }

  return getAllProducts
}
