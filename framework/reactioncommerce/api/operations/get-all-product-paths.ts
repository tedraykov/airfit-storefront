import { OperationContext } from '@commerce/api/operations'
import type { CatalogItemConnection } from '../../schema'
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
    console.log(data)
    const products = data?.edges ?? []

    return {
      products: products.map(({ node }) => ({
        path: `/${node.product?.slug}`,
      })),
    }
  }

  return getAllProductPaths
}
