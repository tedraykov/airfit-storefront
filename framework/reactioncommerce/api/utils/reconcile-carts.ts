import reconcileCartsMutation from '@framework/utils/mutations/reconcile-carts'
import { ReactionCommerceConfig } from '@framework/api'

async function reconcileCarts(config: ReactionCommerceConfig) {
  const {
    data: {
      reconcileCarts: { cart: rawReconciledCart },
    },
  } = await config.fetch(
    reconcileCartsMutation,
    {
      variables: {
        input: {
          anonymousCartId: config.cartIdCookie,
          cartToken: config.anonymousCartTokenCookie,
          shopId: config.shopId,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${config.customerCookie}`,
      },
    }
  )

  return rawReconciledCart
}

export default reconcileCarts
