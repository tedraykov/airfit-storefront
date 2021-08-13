import { GraphQLFetcherResult } from '@commerce/api'
import { ReactionCommerceConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'
import commerce from '@lib/api/commerce'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

const getProduct = async (options: {
  variables: Variables
  config: ReactionCommerceConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = commerce.getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })

  const { catalogItemProduct: product } = data

  return {
    product: product ? normalizeProduct(product) : null,
  }
}

export default getProduct
