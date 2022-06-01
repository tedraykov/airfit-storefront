import graphQLRequest from '../graphQLRequest'
import { getProductQuery } from '@graphql/queries'
import { CatalogItemProduct } from '@graphql/schema'

export default async function getCatalogProduct(slugOrId: string) {
  if (!slugOrId) return null

  const data = await graphQLRequest<{ catalogItemProduct: CatalogItemProduct }>(
    getProductQuery,
    {
      slugOrId,
    }
  )

  return (
    (data && data.catalogItemProduct && data.catalogItemProduct.product) || null
  )
}
