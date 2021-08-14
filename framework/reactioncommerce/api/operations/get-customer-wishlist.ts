import { OperationContext } from '@commerce/api/operations'
import { Provider, ReactionCommerceConfig } from '../'

export default function getCustomerWishlistOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getCustomerWishlist({
    config: cfg,
    variables,
    includeProducts,
  }: {
    url?: string
    variables: any
    config?: Partial<ReactionCommerceConfig>
    includeProducts?: boolean
  }): Promise<any> {
    const config = commerce.getConfig(cfg)
    return { wishlist: {} }
  }

  return getCustomerWishlist
}
