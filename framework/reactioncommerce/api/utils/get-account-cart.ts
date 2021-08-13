import { ReactionCommerceConfig } from '@framework/api'
import accountCartByAccountIdQuery from '@framework/utils/queries/account-cart-by-account-id'
import getAuthorizationHeader from '@framework/api/utils/request-authorization'

export const getAccountCart = async (
  accountId: string,
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
) => {
  const {
    data: { cart: rawAccountCart },
  } = await config.fetch(
    accountCartByAccountIdQuery,
    {
      variables: {
        accountId,
        shopId: config.shopId,
      },
    },
    {
      headers: getAuthorizationHeader(cookies[config.customerCookie]),
    }
  )

  return rawAccountCart
}
