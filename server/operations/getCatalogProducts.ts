import graphQLRequest from '../graphQLRequest'
import { catalogItemsQuery } from '@graphql/queries'
import {
  CatalogItemConnection,
  CatalogItemProduct,
  QueryCatalogItemsArgs,
} from '@graphql/schema'

export default async function getCatalogProducts(
  variables: QueryCatalogItemsArgs
) {
  const data = await graphQLRequest<{ catalogItems: CatalogItemConnection }>(
    catalogItemsQuery,
    variables
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
