import reconcileCartsMutation from '@framework/utils/mutations/reconcile-carts'
import { ReactionCommerceConfig } from '@framework/api'
import getAuthorizationHeader from '@framework/api/utils/request-authorization'

async function reconcileCart(
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
) {
  const {
    data: {
      reconcileCarts: { cart: rawReconciledCart },
    },
  } = await config.fetch(
    reconcileCartsMutation,
    {
      variables: {
        input: {
          anonymousCartId: cookies[config.cartIdCookie],
          cartToken: cookies[config.anonymousCartTokenCookie ?? ''],
          shopId: config.shopId,
        },
      },
    },
    {
      headers: getAuthorizationHeader(cookies[config.customerCookie]),
    }
  )

  return rawReconciledCart
}

export default reconcileCart
