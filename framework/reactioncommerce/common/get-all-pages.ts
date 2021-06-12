import { getConfig, ReactionCommerceConfig } from '../api'
import { Shop } from '../schema'
import { getAllPagesQuery } from '../utils/queries'
import { normalizePages } from '@framework/utils'

type Variables = {
  first?: number
}

type ReturnType = {
  pages: Page[]
}

export type Page = {
  id: string
  name: string
  url: string
  sort_order?: number
  body: string
}

const getAllPages = async (options?: {
  variables?: Variables
  config: ReactionCommerceConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllPagesQuery, {
    variables: {
      ...variables,
      shopId: config.shopId,
    },
  })
  const pages = normalizePages(data.shop as Shop)

  return { pages }
}

export default getAllPages
