import { ReactionCommerceConfig } from '../api'
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query'
import commerce from '@lib/api/commerce'

const getAllCollections = async (options?: {
  variables?: any
  config: ReactionCommerceConfig
  preview?: boolean
}) => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = commerce.getConfig(config)

  const { data } = await config.fetch(getAllCollectionsQuery, { variables })
  const edges = data.collections?.edges ?? []

  const categories = edges.map(
    ({ node: { id: entityId, title: name, handle } }: any) => ({
      entityId,
      name,
      path: `/${handle}`,
    })
  )

  return {
    categories,
  }
}

export default getAllCollections
