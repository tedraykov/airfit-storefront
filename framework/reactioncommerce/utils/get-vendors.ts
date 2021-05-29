import { ReactionCommerceConfig } from '../api'
import getAllProductVendors from './queries/get-all-product-vendors-query'
import { Vendor } from '@framework/schema'

export type Brand = {
  entityId: string
  name: string
  path: string
}

export type BrandEdge = {
  node: Brand
}

export type Brands = BrandEdge[]

const getVendors = async (
  config: ReactionCommerceConfig
): Promise<BrandEdge[]> => {
  const {
    data: { vendors },
  } = await config.fetch(getAllProductVendors, {
    variables: {
      shopIds: [config.shopId],
    },
  })

  let vendorsStrings: string[] = vendors.nodes?.map(({ name }: Vendor) => name)

  return [...new Set(vendorsStrings)].map((v) => ({
    node: {
      entityId: v,
      name: v,
      path: `brands/${v}`,
    },
  }))
}

export default getVendors
