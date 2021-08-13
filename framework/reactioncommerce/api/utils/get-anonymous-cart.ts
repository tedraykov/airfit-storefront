import getAnonymousCartQuery from '@framework/utils/queries/get-anonymous-cart'
import { ReactionCommerceConfig } from '@framework/api'

export const getAnonymousCart = async (
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
) => {
  const {
    data: { cart: rawAnonymousCart },
  } = await config.fetch(getAnonymousCartQuery, {
    variables: {
      cartId: cookies[config.cartIdCookie],
      cartToken: cookies[config.anonymousCartTokenCookie ?? ''],
    },
  })

  return rawAnonymousCart
}
