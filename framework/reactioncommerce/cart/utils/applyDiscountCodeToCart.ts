import { Fetcher } from '@commerce/utils/types'
import { ResponseState } from '@commerce/utils/use-data'
import { Cart } from '@framework/types/cart'
import {
  ApplyDiscountCodeToCartInput,
  Cart as ReactionCart,
} from '@framework/schema'
import { normalizeCart } from '@framework/utils'
import { getCartIdCookie } from '@framework/utils/get-cart-id-cookie'
import { getAnonymousCartToken } from '@framework/utils/anonymous-cart-token'
import applyDiscountCodeToCartMutation from '@framework/utils/mutations/apply-discount-code-to-cart'

export const applyDiscountCodeToCart =
  (fetcher: Fetcher, response: ResponseState<Cart | undefined | null>) =>
  async (discountCode: string): Promise<Cart> => {
    const {
      applyDiscountCodeToCart: { cart },
    } = await fetcher({
      query: applyDiscountCodeToCartMutation,
      variables: <{ input: ApplyDiscountCodeToCartInput }>{
        input: {
          cartId: getCartIdCookie(),
          token: getAnonymousCartToken(),
          shopId: response.data!.shopId,
          discountCode,
        },
      },
    })
    const normalizedCart = normalizeCart(cart as ReactionCart)!

    await response.mutate(
      {
        ...response.data!,
        ...normalizedCart,
      },
      false
    )

    return normalizedCart
  }
