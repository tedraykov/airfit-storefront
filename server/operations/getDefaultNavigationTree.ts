import graphQLRequest from '../graphQLRequest'
import { Shop } from '@graphql/schema'
import defaultNavigationTree from '@graphql/queries/defaultNavigationTree'
import { SHOP_ID } from '@config/index'

export default async function getDefaultNavigationTree() {
  const data = await graphQLRequest<{ shop: Shop }>(defaultNavigationTree, {
    id: SHOP_ID,
  })

  return (data && data.shop && data.shop.defaultNavigationTree) || null
}
