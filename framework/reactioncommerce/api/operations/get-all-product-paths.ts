import { OperationContext } from '@commerce/api/operations'
import type { CatalogItemConnection, CatalogItemProduct } from '../../schema'
import { Provider } from '../index'
import getAllProductsPathsQuery from '../../utils/queries/get-all-products-paths-query'
import { GetAllProductPathsOperation } from '@commerce/types/product'
import { ReactionCommerceConfig } from '..'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query = getAllProductsPathsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: ReactionCommerceConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    const { data } = await config.fetch<CatalogItemConnection>(query, {
      variables: {
        ...variables,
        shopIds: [config.shopId],
      },
    })
    const products = data?.edges ?? []

    let productPaths = products
      .filter((productEdge) => !!productEdge && !!productEdge.node)
      .map((productEdge) => ({
        path: `/${(productEdge?.node as CatalogItemProduct).product?.slug}`,
      }))

    return {
      products: productPaths,
    }
  }

  return getAllProductPaths
}
