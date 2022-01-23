import { normalizeContentfulFeaturedProduct } from '@framework/utils'
import { getContentfulFeaturedProducts } from '@lib/contentful/contentful'
import { FeaturedProduct } from '@framework/types/page'
import { IFeaturedProduct } from '@lib/contentful/schema'

export type GetFeaturedProductsResult<
  T extends { featuredProducts?: any[] } = {
    featuredProducts?: FeaturedProduct[]
  }
> = T

export default function getFeaturedProductsOperation() {
  async function getFeaturedProducts(): Promise<GetFeaturedProductsResult> {
    const contentfulFeaturedProducts = await getContentfulFeaturedProducts()
    return {
      featuredProducts: normalizeContentfulFeaturedProduct(
        contentfulFeaturedProducts as IFeaturedProduct[]
      ),
    }
  }

  return getFeaturedProducts
}
