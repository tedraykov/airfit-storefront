import getCategories, { Category } from '../utils/get-categories'
import getVendors, { Brands } from '../utils/get-vendors'

import { getConfig, ReactionCommerceConfig } from '../api'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brands
  }
> = T

const getSiteInfo = async (options?: {
  variables?: any
  config: ReactionCommerceConfig
  preview?: boolean
}): Promise<GetSiteInfoResult> => {
  let { config } = options ?? {}

  config = getConfig(config)

  const categories = await getCategories(config)
  const brands = await getVendors(config)

  return {
    categories: categories as unknown as Category[],
    brands,
  }
}

export default getSiteInfo
