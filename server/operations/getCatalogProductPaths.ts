import { catalogItemPathsQuery } from '@graphql/queries'
import {
  CatalogItemConnection,
  CatalogItemProduct,
  QueryCatalogItemsArgs,
} from '@graphql/schema'
import graphQLRequest from '../graphQLRequest'
import { SHOP_ID } from '@config/index'

export default async function getCatalogProductPaths(
  variables?: Omit<QueryCatalogItemsArgs, 'shopIds'>
) {
  const data = await graphQLRequest<{ catalogItems: CatalogItemConnection }>(
    catalogItemPathsQuery,
    {
      shopIds: [SHOP_ID],
      ...variables,
    }
  )

  return (
    (data &&
      data.catalogItems &&
      data.catalogItems.nodes &&
      (data.catalogItems.nodes as CatalogItemProduct[]).map(
        (item) => item.product
      )) ||
    []
  )
}
