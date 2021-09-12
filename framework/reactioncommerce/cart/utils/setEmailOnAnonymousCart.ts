import { Fetcher } from '@commerce/utils/types'
import { ResponseState } from '@commerce/utils/use-data'
import { Cart } from '@framework/types/cart'
import setEmailOnAnonymousCartMutation from '@framework/utils/mutations/set-email-on-anonymous-cart'
import { Cart as ReactionCart, SetEmailOnAnonymousCartInput } from '@framework/schema'
import { normalizeCart } from '@framework/utils'
import { getCartIdCookie } from '@framework/utils/get-cart-id-cookie'
import { getAnonymousCartToken } from '@framework/utils/anonymous-cart-token'

export const setEmailOnAnonymousCart = (
  fetcher: Fetcher,
  response: ResponseState<Cart | undefined | null>
) =>
  async (email: string): Promise<Cart> => {
    const {
      setEmailOnAnonymousCart: { cart }
    } = await fetcher({
      query: setEmailOnAnonymousCartMutation,
      variables: <SetEmailOnAnonymousCartInput>{
          cartId: getCartIdCookie(),
          cartToken: getAnonymousCartToken(),
          email
      }
    })
    const normalizedCart = normalizeCart(cart as ReactionCart)!

    await response.mutate(
      {
        ...response.data!,
        ...normalizedCart
      },
      false
    )

    return normalizedCart
  }
