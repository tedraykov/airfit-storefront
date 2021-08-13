import { addCartItemsMutation } from '@framework/utils'
import getAuthorizationHeader from '@framework/api/utils/request-authorization'
import { ReactionCommerceConfig } from '@framework/api'
import { CartItemBody } from '@framework/types'

export const updateCart = async (
  item: CartItemBody,
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
) =>
  await config.fetch(
    addCartItemsMutation,
    {
      variables: {
        input: {
          cartId: cookies[config.cartIdCookie],
          cartToken: cookies[config.anonymousCartTokenCookie ?? ''],
          items: [
            {
              productConfiguration: {
                productId: item.productId,
                productVariantId: item.variantId,
              },
              quantity: item.quantity,
              price: item.pricing,
            },
          ],
        },
      },
    },
    {
      headers: getAuthorizationHeader(cookies[config.customerCookie]),
    }
  )
