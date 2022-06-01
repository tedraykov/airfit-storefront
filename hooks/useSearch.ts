import { useQuery } from '@apollo/client'
import catalogItems from '@graphql/queries/catalogItems'
import {
  CatalogItemConnection,
  CatalogItemProduct,
  QueryCatalogItemsArgs,
} from '@graphql/schema'
import { SHOP_ID } from '@config/index'
import { useEffect } from 'react'

type SearchHookOptions = Omit<QueryCatalogItemsArgs, 'shopIds'>

export default function useSearch(options: SearchHookOptions) {
  const { data, loading } = useQuery<
    { catalogItems: CatalogItemConnection },
    QueryCatalogItemsArgs
  >(catalogItems, {
    variables: {
      shopIds: [SHOP_ID],
      ...options,
    },
  })

  return {
    products: (data?.catalogItems?.nodes as CatalogItemProduct[])?.map(
      (item) => item.product
    ),
    totalCount: data?.catalogItems?.totalCount,
    loading,
  }
}
